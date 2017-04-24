import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


export class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}

@Injectable()
export class AuthService {
    currentUser: User;
    constructor(private http: Http) { }
    public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {
                // At this point make a request to your backend to make a real check!
                let data = new URLSearchParams();
                data.append('az', 'login');
                data.append('cmd', 'login');
                data.append('שם-משתמש', credentials.email);
                data.append('סיסמה', credentials.password);
                let headers = new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Language': 'app'
                });
                let options = new RequestOptions({ headers: headers });
                debugger;
                //return this.http.get('http://rotter.net/gilad/doron.php')
                return this.http.post('http://rotter.net/cgi-bin/forum/dcboard.cgi', data, options)
                    .toPromise().then(() => {
                        debugger;
                        let access = true; //(credentials.password === "pass" && credentials.email === "email");
                        this.currentUser = new User('Simon', 'saimon@devdactic.com');
                        observer.next(access);
                        observer.complete();
                    });
            });
        }
    }

    public register(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            // At this point store the credentials to your backend!
            return Observable.create(observer => {
                observer.next(true);
                observer.complete();
            });
        }
    }

    public getUserInfo(): User {
        return this.currentUser;
    }

    public logout() {
        return this.http.get('http://rotter.net/cgi-bin/forum/dcboard.cgi?az=logout')
            .toPromise();
    }
}