import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ThreadPage } from '../thread/thread';

import { NewsService } from '../../app/news.service'
import { Thread } from '../../app/thread'
import { CommentPage } from '../comment/comment';

import moment from 'moment';

@Component({
    selector: 'page-forum',
    templateUrl: 'forum.html'
})
export class ForumPage {
    moment: any;

    name: string;
    alias: string;
    icons: string[];
    threads: Thread[];
    unfilterThreads: Thread[];
    loader: Loading;
    showLoading: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private newsService: NewsService,
        private loadingCtrl: LoadingController) {
        this.name = navParams.get('name');
        this.alias = navParams.get('alias');

        this.moment = moment;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ForumPage');
        this.showLoading = true;

        this.newsService.getThreads(this.name).then(threads => {
            this.threads = this.unfilterThreads = threads;
            this.showLoading = false;
            this.loader && this.loader.dismiss().catch(() => console.error('loader was not dismissed'));
        });
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter ForumPage');
        if (this.showLoading) {
            this.loader = this.loadingCtrl.create({
                //dismissOnPageChange: true
            });
            this.loader.present();
        }
    }

    threadSelected(event, thread: Thread) {
        this.navCtrl.push(ThreadPage, {
            title: thread.title,
            om: thread.om,
            forumName: this.name,
            forumAlias: this.alias
        });
    }

    refreshForum(refresher) {

        this.newsService.getThreads(this.name).then(threads => {
            this.unfilterThreads = this.threads = threads;
            refresher.complete();
        });
    }

    searchThreads(ev: any) {
        let val = ev.target.value;

        if (val && val.trim() != '') {
            this.threads = this.unfilterThreads.filter((item) => {
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
        else {
            this.threads = this.unfilterThreads
        }
    }

    newThread() {
        this.navCtrl.push(CommentPage, {
            forumName: this.name,
            forumAlias: this.alias
        });
    }
}
