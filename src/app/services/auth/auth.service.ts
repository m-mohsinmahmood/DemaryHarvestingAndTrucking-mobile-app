/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Optional } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { AuthState } from './auth.model';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

import { PlatformService } from '../../services/platform/platform.service';
import { HarvestingService } from './../../views/dashboard/harvesting/harvesting.service';

const initialAuthState: AuthState = {
  isLoggedIn: false,
  isEmailVerified: false,
  id: null,
  email: null,
  name: null,
  phone_number: null,
  token: null,
  display_picture: null,
  cover_photo: null,
  role: null,
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Loaders
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  readonly isLoading$ = this.isLoading.asObservable();
  //Auth State Management
  private readonly _authState = new BehaviorSubject<AuthState>(
    initialAuthState
  );
  readonly auth$ = this._authState.asObservable();

  token: string;
  isMobileDevice: boolean;

  constructor(
    @Optional() private auth: Auth,
    private toast: ToastService,
    private router: Router,
    private platform: PlatformService,
    private harvestingService: HarvestingService
  ) {
    this.isMobileDevice = this.platform.isMobile();
    this.auth.onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken(true).then((token) => {
          const token_decoded: any = jwt_decode(token);
          let u: AuthState = {
            isLoggedIn: false,
            isEmailVerified: user.emailVerified,
            id: user.uid,
            email: user.email,
            name: user.displayName,
            phone_number: user.phoneNumber,
            token: token,
            display_picture: user.photoURL,
            role: token_decoded.role,
            cover_photo: token_decoded.cover_photo,
          };
          this._authState.next(u);
          this.token = u.token;
        });
      }
    });

    this.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.isLoading.next(false);
        this._authState.next(initialAuthState);
        return;
      }

      user.getIdToken(true).then((token) => {
        const token_decoded: any = jwt_decode(token);
        let u: AuthState = {
          isLoggedIn: false,
          isEmailVerified: user.emailVerified,
          id: user.uid,
          email: user.email,
          name: user.displayName,
          phone_number: user.phoneNumber,
          token: token,
          display_picture: user.photoURL,
          role: token_decoded.role,
          cover_photo: token_decoded.cover_photo,
        };
        this._authState.next(u);
        this.token = u.token;
      });
    });
  }

  async loginWithEmailPassword(email: string, password: string) {
    //to start loader
    this.isLoading.next(true);

    signInWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        // console.log('user', user);
        console.log('Firebase Id:', user.user.uid);

        // localstorage
        localStorage.setItem('fb_id', user.user.uid);

        // getting employee details
        this.getEmployeeDetailsByFirbaseId(user.user.uid);

      })
      .catch(async (err: FirebaseError) => {
        this.isLoading.next(false);
        console.log('err', err);

        if (err.code === 'auth/wrong-password') {
          this.toast.presentToast(
            'Wrong Password. Password provided does not match with the identity already registered. Please add the valid password and try again.',
            'danger'
          );
        } else if (err.code === 'auth/user-not-found') {
          this.toast.presentToast(
            'No user found. With provided credentials, we could not find any user registered. Please sign up your new account and try again.',
            'danger'
          );
        } else if (err.code === 'auth/user-disabled') {
          this.toast.presentToast(
            'No user found. With provided credentials, we could not find any user registered. Please sign up your new account and try again.',
            'danger'
          );
          this.toast.presentToast(
            'Account Blocked. Your account is blocked by PandaStronger moderation team. Please contact support to verify and enable it.',
            'danger'
          );
        } else if (err.code === 'auth/too-many-requests') {
          this.toast.presentToast(
            'To Many Requests. Your account is temporary blocked by DHT moderation team. Please try again in few mins.',
            'danger'
          );
        }
      });
  }

  async logout() {
    await signOut(this.auth);
    localStorage.removeItem('employeeId');
    localStorage.removeItem('role');
    localStorage.removeItem('actualRole');
    localStorage.removeItem('fb_id');
    localStorage.removeItem('state');
    localStorage.removeItem('employeeName');

    this.router.navigate(['login'], { replaceUrl: true });
  }

  getEmployeeDetailsByFirbaseId(fb_id) {
    this.harvestingService.getEmployeeByFirebaseId(fb_id).subscribe((res) => {
      console.log('Employee Details:', res);

      // setting in local storage
      localStorage.setItem('employeeId', res.id);
      localStorage.setItem('role', res.role);
      localStorage.setItem('state', res.state);
      localStorage.setItem('employeeName', res.employee_name);
      localStorage.setItem('actualRole', res.role);

      //to stop loader
      this.isLoading.next(false);
      this.router.navigate(['tabs'], { replaceUrl: true });
    });
  }
  async refreshToken() {
    const user = this.auth.currentUser;
    const token = await user.getIdToken(true);

    let currentAuthState = this._authState.value;
    currentAuthState.token = token;
    this._authState.next(currentAuthState);
    // console.log('token', token);
  }
}
