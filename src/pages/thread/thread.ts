import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

import {
    NavController, NavParams, LoadingController, Loading, PopoverController, Popover, Refresher, ToastController, Content
} from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

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
    moment: any;
    wrapImageRegex: RegExp;
    loader: Loading;
    showLoading: boolean = false;
    popover: Popover;

    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
        private newsService: NewsService, private sanitizer: DomSanitizer, private loadingCtrl: LoadingController,
        private popoverCtrl: PopoverController) {

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
            this.comments = comments;
            this.loader && this.loader.dismiss().catch(() => console.error('loader was not dismissed'));
            this.showLoading = false;
        });

        //$('page-thread').on('click', 'a', function (e: Event) {
        //    console.log('prevented');
        //    e.preventDefault();
        //});
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
            this.comments = comments;
            if (refresher)
                refresher.complete();
            else if (this.popover) {
                this.goToComment(0);
            }
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
            //let browser = new InAppBrowser((element as HTMLAnchorElement).href, '_system');
            let browser = new InAppBrowser((element as HTMLAnchorElement).href, '_blank', 'location=no,toolbar=no,closebuttoncaption=סגור,zoom=no');
        }
        return false;
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
}
