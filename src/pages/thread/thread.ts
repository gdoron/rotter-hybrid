import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { CommentPage } from '../comment/comment';
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
    om: string;
    comments: Comment[];
    moment: any;
    wrapImageRegex: RegExp;
    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
        private newsService: NewsService, private sanitizer: DomSanitizer) {
        this.forumName = navParams.get('forumName');
        this.om = navParams.get('om');
        this.title = navParams.get('title');
        this.moment = moment;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ThreadPage');
    }

    ngOnInit() {
        this.newsService.getComments(this.forumName, this.om).then(comments => {
            this.comments = comments;

            //window.setTimeout(() => {
            //    (<any>window).x = $('page-thread .body img');
            //    $('page-thread .body img').on('load', function () {
            //        console.log($(this));
            //        $(this).addClass('loaded');
            //    });
            //}, 50);
        });
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
            forumName: this.forumName
        });
    }
}
