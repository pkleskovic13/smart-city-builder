import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FirestoreUser } from 'src/app/models/firestore-user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<User>;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  getCurrentUser(): User {
    const user = firebase.auth().currentUser;

    if (user != null) {
      return user;
    }

    return null;
  }

  // Firebase Logout
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // Firebase Email Sign-in
  async signInWithEmail(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password).then((credential) => {
      this.updateUserData(credential.user);

      // This section is honestly a convoluted mess and can be improved significantly, but considering the rush this is wip
      this.isLoggedInAndIsAdmin().then(response => {
        // Checks if the user is logged in as the admin, if not, reroute to the user screen
        if (response) {
          // Checks if the user is currently trying to log into the admin panel, if not, will reroute to app
          if (this.router.url === '/admin/login') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/app']);
          }
        } else {
          this.router.navigate(['/app']);
        }
      });
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }
    );
  }

  async isLoggedInAndIsAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          console.log('issLoggedInAndIsAdmin derped, did not find the user');
          resolve(false);
        } else {
          console.log('issLoggedInAndIsAdmin found the user: ' + user.uid);
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
          console.log(userRef);
          userRef.valueChanges().subscribe((ind: FirestoreUser) => {
            console.log('ind');
            console.log(ind);
            // Workaround, I am waiting for the next tick, because usually it would return everything except for the admin data
            setTimeout(() => {
              if (ind.admin) {
                console.log('issLoggedInAndIsAdmin found the admin: ' + ind.admin);
                resolve(true);
              } else {
                console.log('issLoggedInAndIsAdmin did not find that the user is admin: ' + ind.admin);
              }
            });
          });
        }
      });
    }
    );
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email
    };

    return userRef.set(data, { merge: true });
  }

  createNewUser(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then((credential) => {
      this.updateUserData(credential.user);
    });
  }
}
