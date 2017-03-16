import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { ElasticModule } from 'angular2-elastic';

import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import { ThreadPage } from '../pages/thread/thread';
import { ForumPage } from '../pages/forum/forum';
import { CommentPage } from '../pages/comment/comment';
import { ThreadPopoverPage } from '../pages/thread-popover/thread-popover';

@NgModule({
    declarations: [
        MyApp,
        Page2,
        ThreadPage,
        ForumPage,
        CommentPage,
        ThreadPopoverPage
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
        CommentPage,
        ThreadPopoverPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
