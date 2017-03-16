import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
    selector: 'page-comment',
    templateUrl: 'comment.html'
})
export class CommentPage {

    title: string;
    replyToIndex: string;
    replyToTitle: string;
    replyToBody: string;
    replyToAuthor: string;
    forumName: string;
    forumAlias: string;
    om: string;
    comment: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
        this.replyToIndex = navParams.get('replyToIndex');
        this.replyToTitle = navParams.get('replyToTitle');
        this.replyToBody = navParams.get('replyToBody');
        this.replyToAuthor = navParams.get('replyToAuthor');
        this.forumName = navParams.get('forumName');
        this.forumAlias = navParams.get('forumAlias');
        this.om = navParams.get('om');

        this.title = this.replyToIndex ? `הגב ל${this.replyToIndex} (${this.replyToAuthor})` : "אשכול חדש ב " + this.forumAlias;

        this.comment = this.formBuilder.group({
            subject: ['', Validators.required],
            body: [''],
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CommentPage');
    }

}
