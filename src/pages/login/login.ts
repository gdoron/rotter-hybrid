import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../app/auth-service';
//import { RegisterPage } from '../register/register';
import { Page2 } from '../page2/page2';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loading: Loading;
    registerCredentials = { email: '', password: '' };

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

    public createAccount() {
        //this.nav.push(RegisterPage);
        alert('Not supported yet from mobile');
        return false;
    }

    public login() {
        this.showLoading()
        this.auth.login(this.registerCredentials).subscribe(allowed => {
            if (allowed) {
                setTimeout(() => {
                    this.loading.dismiss();
                    this.nav.setRoot(Page2)
                });
            } else {
                this.showError("שם משתמש או סיסמא שגויים");
            }
        },
            error => {
                this.showError(error);
            });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    showError(text) {
        setTimeout(() => {
            this.loading.dismiss();
        });

        let alert = this.alertCtrl.create({
            title: 'שגיאה',
            subTitle: text,
            buttons: ['סגור']
        });
        alert.present(prompt);
    }
}