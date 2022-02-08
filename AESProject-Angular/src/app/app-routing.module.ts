import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/pages/signup/signup.component';
import { SigninComponent } from './components/pages/signin/signin.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile/profile.component';
import { PostsComponent } from './components/pages/profile/posts/posts.component';
import { BioComponent } from './components/pages/profile/bio/bio.component';
import { ConfigComponent } from './components/pages/profile/config/config.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ChatComponent } from './components/pages/chat/chat.component';

import { SalesComponent } from './components/dashboards/sales/sales.component';
import { OthersComponent } from './components/dashboards/others/others/others.component';
import { NotificationsComponent } from './components/dashboards/others/notifications/notifications.component';
import { GalleryComponent } from './components/dashboards/others/gallery/gallery.component';
import { ProfileSettingsComponent } from './components/dashboards/others/profile-settings/profile-settings.component';
import { ErrorComponent } from './components/dashboards/others/error/error.component';

const routes: Routes = [
    {path: '', component: SigninComponent},

    {path: 'signIn', component: SigninComponent},
    {path: 'signUp', component: SignupComponent},
    {path: 'home', component: HomeComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'search', component: SearchComponent},

    {path: 'utiles', component: SalesComponent},

    {
        path: 'profile', component: ProfileComponent,
        children: [
            {
                path: 'posts',
                data: { breadcrumb: 'Posts' },
                component: PostsComponent
            },
            {
                path: 'bio',
                data: { breadcrumb: 'Biography' },
                component: BioComponent
            },
            {
                path: 'config',
                data: { breadcrumb: 'config' },
                component: ConfigComponent
            },
            {path: '**', redirectTo: 'posts'}
        ]
    },

    {
        path: 'others', component: OthersComponent,
        children: [
            {
                path: 'notifications',
                data: { breadcrumb: 'Notifications' },
                component: NotificationsComponent
            },
            {
                path: 'gallery',
                data: { breadcrumb: 'Gallery' },
                component: GalleryComponent
            },
            {
                path: 'profile',
                data: { breadcrumb: 'Profile' },
                component: ProfileComponent
            },
            {
                path: 'profile-settings',
                data: { breadcrumb: 'Profile Settings' },
                component: ProfileSettingsComponent
            },
            {
                path: 'error-404',
                data: { breadcrumb: 'Error' },
                component: ErrorComponent
            }
        ]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
