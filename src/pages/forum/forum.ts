import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ThreadPage } from '../thread/thread';

import { NewsService } from '../../app/news.service'
import { Thread } from '../../app/thread'

@Component({
    selector: 'page-forum',
    templateUrl: 'forum.html'
})
export class ForumPage {

    name: string;
    alias: string;
    icons: string[];
    threads: Thread[];
    unfilterThreads: Thread[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private newsService: NewsService) {
        this.name = navParams.get('name');
        this.alias = navParams.get('alias');
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
    }

    ngOnInit() {
        this.newsService.getThreads(this.name).then(threads => {
            this.threads = this.unfilterThreads = threads;
        });
    }


    threadSelected(event, thread: Thread) {
        this.navCtrl.push(ThreadPage, {
            title: thread.title,
            om: thread.om,
            forumName: this.name
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

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.threads = this.unfilterThreads.filter((item) => {
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
        else {
            this.threads = this.unfilterThreads
        }
    }
}
