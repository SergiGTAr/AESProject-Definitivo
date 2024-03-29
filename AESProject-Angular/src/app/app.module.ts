import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { SigninComponent } from './components/pages/signin/signin.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile/profile.component';
import { PostsComponent } from './components/pages/profile/posts/posts.component';
import { BioComponent } from './components/pages/profile/bio/bio.component';
import { ConfigComponent } from './components/pages/profile/config/config.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ChatComponent } from './components/pages/chat/chat.component';

import { PostComponent } from './components/elements/post/post.component';
import { CommentComponent } from './components/elements/comment/comment.component';
import { NewPostComponent } from './components/elements/new-post/new-post.component';
import { PostBoxComponent } from './components/elements/post-box/post-box.component';

import { HeaderComponent } from './components/layout/header/header.component';
import { HeaderProfileComponent } from './components/layout/header-profile/header-profile.component';

import { UserService } from './services/user.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NewCommentComponent } from './components/elements/new-comment/new-comment.component';
import { UserListComponent } from './components/elements/user-list/user-list.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        SigninComponent,
        HomeComponent,
        ProfileComponent,
        SearchComponent,
        ChatComponent,
        PostComponent,
        CommentComponent,
        NewPostComponent,
        PostBoxComponent,
        PostsComponent,
        BioComponent,
        ConfigComponent,
        HeaderComponent,
        HeaderProfileComponent,
        NewCommentComponent,
        UserListComponent,
        NotificationsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
