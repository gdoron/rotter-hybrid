import { Component, ViewChild, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import {
    NavController, NavParams, LoadingController, Loading, PopoverController, Popover, Refresher, ToastController, Content
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CommentPage } from '../comment/comment';
import { ThreadPopoverPage } from '../thread-popover/thread-popover';

import { Comment } from '../../app/comment';
import { NewsService } from '../../app/news.service';
import moment from 'moment';
import $ from 'jquery';

@Component({
    selector: 'page-thread',
    templateUrl: 'thread.html',
})
export class ThreadPage {
    @ViewChild(Content) content: Content;

    title: string;
    forumName: string;
    forumAlias: string;
    om: string;
    comments: Comment[];
    unfilterComments: Comment[];
    moment: any;
    wrapImageRegex: RegExp;
    loader: Loading;
    showLoading: boolean = false;
    popover: Popover;
    infiniteScroll: any;
    currentLoadedComments: number = 10;

    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
        private newsService: NewsService, private sanitizer: DomSanitizer, private loadingCtrl: LoadingController,
        private popoverCtrl: PopoverController, private ngZone: NgZone, private inAppBrowser: InAppBrowser) {

        this.forumName = navParams.get('forumName');
        this.forumAlias = navParams.get('forumAlias');
        this.om = navParams.get('om');
        this.title = navParams.get('title');
        this.moment = moment;
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad ThreadPage');
        this.showLoading = true;
        this.newsService.getComments(this.forumName, this.om).then(comments => {
            this.unfilterComments = comments;
            this.comments = comments.slice(0, this.currentLoadedComments);
            this.loader && this.loader.dismiss().catch(() => console.error('loader was not dismissed'));
            this.showLoading = false;
            this.loadEmbedded();
        });
    }


    ionViewDidEnter() {
        console.log('ionViewDidEnter ThreadPage');
        if (this.showLoading) {
            this.loader = this.loadingCtrl.create({
                //dismissOnPageChange: true
            });
            this.loader.present();
        }
    }

    refreshComments(refresher?: Refresher) {
        this.newsService.getComments(this.forumName, this.om).then(comments => {
            this.unfilterComments = comments;
            this.currentLoadedComments = 10;
            this.comments = comments.slice(0, this.currentLoadedComments);

            if (refresher)
                refresher.complete();
            else if (this.popover) {
                this.goToComment(0);
            }

            this.loadEmbedded();
        });
    }

    reply(comment: Comment) {
        this.navCtrl.push(CommentPage, {
            replyToTitle: comment.title,
            replyToBody: comment.html,
            replyToAuthor: comment.author,
            replyToIndex: comment.parent,
            om: this.om,
            forumName: this.forumName,
            forumAlias: this.forumAlias
        });
    }
    goToComment(index: number) {
        if (this.popover) {
            this.popover.dismiss();
        }
        let element = document.getElementById('comment' + index);
        this.content.scrollTo(0, element.offsetTop, 500);
    }

    openLink(element: HTMLElement) {
        console.log('Element');
        if (element.tagName == 'A') {
            console.log('Anchor');
            this.inAppBrowser.create((element as HTMLAnchorElement).href, '_blank', 'location=no,toolbar=no,closebuttoncaption=סגור,zoom=no');
        }
        return false;
    }

    loadEmbedded() {
        console.log('loadEmbedded ' + (+new Date()));

        this.ngZone.runOutsideAngular(() => {
            console.log('running outside... ' + (+new Date()));
            setTimeout(() => {
                console.log('running in timeout to load embedded... ' + (+new Date()));
                (window as any).FB.XFBML.parse()
            }, 3000);
        });
    }

    presentThreadPopover(event) {
        console.log('open popover');
        this.popover = this.popoverCtrl.create(ThreadPopoverPage, {
            commentsCount: this.comments.length,
            url: `http://rotter.net/forum/${this.forumName}/${this.om}.shtml`,
            title: this.title,
            threadPage: this
        });

        this.popover.present({ ev: event });
    }

    doInfinite(infiniteScroll) {
        console.log('doInfinite begin');
        this.infiniteScroll = infiniteScroll;
        this.currentLoadedComments += 10;
        if (this.currentLoadedComments >= this.unfilterComments.length) {
            this.comments = this.unfilterComments;
            infiniteScroll.enable(false);
        }
        else {
            this.comments = this.unfilterComments.slice(0, this.currentLoadedComments);
        }
        console.log('doInfinite end');
        infiniteScroll.complete();

    }
}
