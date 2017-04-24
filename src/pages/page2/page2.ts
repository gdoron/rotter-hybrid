import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ForumPage } from '../forum/forum';
import { NewsService } from '../../app/news.service'
import { Forum } from '../../app/forum';
import { AdMobPro } from '../../providers/admobpro';

@Component({
    selector: 'page-page2',
    templateUrl: 'page2.html'
})
export class Page2 {
    selectedItem: any;
    icons: string[];
    forumNames: string[];
    forums: Forum[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private newsService: NewsService, private adMobPro: AdMobPro) {
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.forumNames = ['Scoops', 'Politics', 'Coffee', 'Something else'];
        this.forums = [];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Page2');
        this.newsService.getForums().then(forums => {
            this.forums = forums;
        });

        setTimeout(() => {
            console.log('showBanner');
            this.adMobPro.showBanner();
        }, 30);
    }

    itemTapped(event, forum: Forum) {
        this.navCtrl.push(ForumPage, {
            name: forum.name,
            alias: forum.alias
        });
    }
}
