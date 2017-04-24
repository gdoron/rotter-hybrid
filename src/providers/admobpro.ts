import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AdMob } from '@ionic-native/admob';

import 'rxjs/add/operator/map';


@Injectable()
export class AdMobPro {
    private _opt;
    private _admobid;

    constructor(platform: Platform, private adMob: AdMob) {
        console.log('Hello Admobpro Provider');
        this._admobid = {};
        platform.ready().then(() => {
            if (platform.is('android')) {
                this._admobid = { // for Android
                    banner: 'ca-app-pub-6869992474017983/9375997553',
                    interstitial: 'ca-app-pub-6869992474017983/1657046752'
                };
            }

            if (platform.is('ios')) {
                this._admobid = { // for iOS
                    banner: 'ca-app-pub-6869992474017983/9375997553',
                    interstitial: 'ca-app-pub-4803471214797648/7259607815'
                };
            }
            this.init();
        });
    }

    init() {
        console.log("AdMob init");
        if (!AdMob) {
            console.log("No AdMob?");
            return;
        }

        // Register AdMob events
        // new events, with variable to differentiate: adNetwork, adType, adEvent

        document.addEventListener('onAdFailLoad', function (data) {
            console.log('onAdFailLoad: ' + JSON.stringify(data));
        });

        document.addEventListener('onAdLoaded', function (data) {
            console.log('onAdLoaded: ' + JSON.stringify(data));
        });

        document.addEventListener('onAdPresent', function (data) {
            console.log('onAdPresent: ' + JSON.stringify(data));
        });
        document.addEventListener('onAdLeaveApp', function (data) {
            console.log('onAdLeaveApp: ' + JSON.stringify(data));
        });

        document.addEventListener('onAdDismiss', function (data) {
            console.log('onAdDismiss: ' + JSON.stringify(data));
        });


        this._opt = {
            // bannerId: admobid.banner,
            // interstitialId: admobid.interstitial,
            // adSize: 'SMART_BANNER',
            // width: integer, // valid when set adSize 'CUSTOM'
            // height: integer, // valid when set adSize 'CUSTOM'
            position: this.adMob.AD_POSITION.BOTTOM_CENTER,
            // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
            bgColor: 'black', // color name, or '#RRGGBB'
            // x: integer,     // valid when set position to 0 / POS_XY
            // y: integer,     // valid when set position to 0 / POS_XY
            isTesting: true, // set to true, to receiving test ad for testing purpose
            // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
        };

        this.adMob.setOptions(this._opt);
        this.showBanner();
    }

    showInterstitial() {
        if (!this.adMob) return false;
        console.log("showInterstitial");
        this.adMob.prepareInterstitial({
            adId: this._admobid.interstitial,
            autoShow: true
        })

        return true;
    }

    showBanner() {
        if (!this.adMob) return false;

        console.log("showBanner");
        this.adMob.createBanner({
            adId: this._admobid.banner,
            position: this.adMob.AD_POSITION.BOTTOM_CENTER,
            autoShow: true
        })
        return true;
    }

    removeAds() {
        if (this.adMob) this.adMob.removeBanner();
    }
}
