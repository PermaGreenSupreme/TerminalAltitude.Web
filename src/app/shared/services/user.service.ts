import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/*
import { User, SDKToken } from '../sdk/models';
import { UserApi, LoopBackAuth } from '../sdk/services';

@Injectable()
export class UserService {
    private _user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private _userApi: UserApi, @Inject(LoopBackAuth) protected auth: LoopBackAuth) {
        this._restoreUser();
    }

    get user(): Observable<any> {
        return this._user.asObservable();
    }

    private _restoreUser(): void {
        this._user.next(this.auth.getCurrentUserData());
    }

    public signIn(user: User, callback?: any): void {
        this._userApi.login(user).subscribe((token: SDKToken) => {
            this.auth.save();
            const user: any = this.auth.getCurrentUserData();
            this._user.next(user);
            if (callback) {
                callback(null, user);
            }
        }, (error: any) => {
            if (callback) {
                callback(error.message, null);
            }
        });
    }

    public signOut(callback?: any): void {
        try {
            this._userApi.logout().subscribe();
        } catch (e) { }
        this.auth.clear();
        this._user.next(null);
        if (callback) {
            callback(null, true);
        }
    }

    public signUp(user: User, callback?: any): void {
        this._userApi.create(user).subscribe((account: any) => {
            if (callback) {
                callback(null, account);
            }
        }, (error: any) => {
            if (callback) {
                callback(error.message, null);
            }
        });
    }
}*/
