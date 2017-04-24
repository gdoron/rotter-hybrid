import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import { ThreadPage } from '../pages/thread/thread';
import { LoginPage } from '../pages/login/login';
import { ForumPage } from '../pages/forum/forum';
import { CommentPage } from '../pages/comment/comment';
import { ThreadPopoverPage } from '../pages/thread-popover/thread-popover';
import { AdMobPro } from '../providers/admobpro';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMob } from '@ionic-native/admob';

@NgModule({
    declarations: [
        MyApp,
        Page2,
        ThreadPage,
        ForumPage,
        CommentPage,
        ThreadPopoverPage,
        LoginPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        HttpModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Page2,
        ThreadPage,
        ForumPage,
        CommentPage,
        ThreadPopoverPage,
        LoginPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, AdMobPro, AdMob,
        InAppBrowser, SplashScreen]
})
export class AppModule { }
