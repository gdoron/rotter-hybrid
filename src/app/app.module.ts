import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { ElasticModule } from 'angular2-elastic';

import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import { ThreadPage } from '../pages/thread/thread';
import { ForumPage } from '../pages/forum/forum';
import { CommentPage } from '../pages/comment/comment';

@NgModule({
    declarations: [
        MyApp,
        Page2,
        ThreadPage,
        ForumPage,
        CommentPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        ElasticModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Page2,
        ThreadPage,
        ForumPage,
        CommentPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
