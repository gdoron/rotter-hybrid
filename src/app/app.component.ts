﻿import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Push } from '@ionic-native/push';

import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { ThreadPage } from '../pages/thread/thread';
import { NewsService } from './news.service';
import { AuthService } from './auth-service';
import moment from 'moment';
import 'moment/min/locales.min';

@Component({
    templateUrl: 'app.html',
    providers: [NewsService, AuthService]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = Page2;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, private alertCtrl: AlertController,
        private splashscreen: SplashScreen, private inAppBrowser: InAppBrowser) {
        this.initializeApp();

        this.pages = [
            { title: 'Forums list', component: Page2 },
            { title: 'התחברות', component: LoginPage }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            moment.locale('he');
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //this.statusBar.styleDefault();
            this.splashscreen.hide();
            //this.initPushNotification();
        });
    }

    //initPushNotification() {
    //    if (!this.platform.is('cordova')) {
    //        console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
    //        return;
    //    }
    //    let push = Push.init({
    //        android: {
    //            senderID: "YOUR_SENDER_ID"
    //        },
    //        ios: {
    //            alert: "true",
    //            badge: false,
    //            sound: "true"
    //        },
    //        windows: {}
    //    });

    //    push.on('registration', (data) => {
    //        console.log("device token ->", data.registrationId);
    //        //TODO - send device token to server
    //    });
    //    push.on('notification', (data) => {
    //        console.log('message', data.message);
    //        let self = this;
    //        //if user using app and push notification comes
    //        if (data.additionalData.foreground) {
    //            // if application open, show popup
    //            let confirmAlert = this.alertCtrl.create({
    //                title: 'New Notification',
    //                message: data.message,
    //                buttons: [{
    //                    text: 'Ignore',
    //                    role: 'cancel'
    //                }, {
    //                    text: 'View',
    //                    handler: () => {
    //                        //TODO: Your logic here
    //                        self.nav.push(ThreadPage, data);
    //                    }
    //                }]
    //            });
    //            confirmAlert.present();
    //        } else {
    //            //if user NOT using app and push notification comes
    //            //TODO: Your logic on click of push notification directly
    //            self.nav.push(ThreadPage, data);
    //            console.log("Push notification clicked");
    //        }
    //    });
    //    push.on('error', (e) => {
    //        console.log(e.message);
    //    });
    //}

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
