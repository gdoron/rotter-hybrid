import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from 'ionic-native';
import { ThreadPage } from '../thread/thread'

@Component({
    selector: 'page-thread-popover',
    templateUrl: 'thread-popover.html',
    providers: [SocialSharing]
})
export class ThreadPopoverPage {
    url: string;
    commentsCount: number;
    title: string;
    threadPage: ThreadPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {
        this.url = navParams.get('url');
        this.commentsCount = navParams.get('commentsCount');
        this.title = navParams.get('title');
        this.threadPage = navParams.get('threadPage');
    }

    goToComment(commentIndex: number) {
        this.threadPage.goToComment(commentIndex);
    }
    share() {
        var options = {
            message: this.title,
            url: this.url
        };

        //var onSuccess = function (result) {
        //    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        //    console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        //}

        //var onError = function (msg) {
        //    console.log("Sharing failed with message: " + msg);
        //}

        this.socialSharing.shareWithOptions(options)//, onSuccess, onError);
        this.threadPage.popover.dismiss();
    }
    refresh() {
        this.threadPage.refreshComments();
    }

    openInBrowser() {
        this.threadPage.popover.dismiss();
        new InAppBrowser(this.url, '_system');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ThreadPopoverPage');
    }
}