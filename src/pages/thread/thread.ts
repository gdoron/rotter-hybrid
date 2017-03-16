import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

import { NavController, NavParams, LoadingController, Loading, PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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

    title: string;
    forumName: string;
    forumAlias: string;
    om: string;
    comments: Comment[];
    moment: any;
    wrapImageRegex: RegExp;
    loader: Loading;
    showLoading: boolean = false;

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

    refreshComments(refresher) {
        this.newsService.getComments(this.forumName, this.om).then(comments => {
            this.comments = comments;
            refresher.complete();
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

    presentThreadPopover(event) {
        console.log('open popover');
        let popover = this.popoverCtrl.create(ThreadPopoverPage);

        popover.present({ ev: event });
    }
}
