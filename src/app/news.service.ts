import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Forum } from './forum';
import { Thread } from './thread';
import { Comment } from './comment';

@Injectable()
export class NewsService {
    wrapImageRegex = /(https?:\/\/.+?\.(?:png|gif|jpeg|jpg))/gim;
    wrapUrlRegex = /(?:^|\s|(?:\<br\s*\/?\>))((https?:\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/[^\s\<]+)?)/gim;
    constructor(/*private toastCtrl: ToastController, */private http: Http) { }

    handleError() {
        //if (!navigator.onLine) {
        //    this.toastCtrl.create({
        //        message: 'No internet connection... :(',
        //        duration: 3000
        //    }).present();
        //}
        //else {
        //    this.toastCtrl.create({
        //        message: 'Something went wrong :( contact support',
        //        duration: 3000
        //    }).present();
        //}
    }
    getForums(): Promise<Forum[]> {
        return this.http.get('http://rotter.net/gilad/doron.php'
        ).toPromise()
            .then(response => response.json().map(data => {
                for (var key in data) {
                    return new Forum(key, data[key])
                }
            }) as Forum[])
            .catch(this.handleError);
    }

    getThreads(forum: string): Promise<Thread[]> {
        return this.http.get('http://rotter.net/gilad/index.php?forum=' + forum).toPromise()
            .then(response => response.json().slice(0, 100) as Thread[])
            .catch(this.handleError);
    }

    getComments(forum: string, om: string): Promise<Comment[]> {
        return this.http.get(`http://rotter.net/gilad/index.php?forum=${forum}&om=${om}`).toPromise()
            .then(response => {
                var comments = response.json().entries as Comment[];
                for (var i = 0; i < comments.length; i++) {
                    comments[i].html = comments[i].html.replace(this.wrapImageRegex, `<img src="$1" class="responsive-img" />`);
                    comments[i].html = comments[i].html.replace(this.wrapUrlRegex, '<a rel="nofollow" href="$1" target="_Blank">$1</a>');
                }

                return comments;
            })
            .catch(this.handleError);
    }
}
