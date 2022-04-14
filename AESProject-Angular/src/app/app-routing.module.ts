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

const routes: Routes = [
    {path: '', component: SigninComponent},

    {path: 'signIn', component: SigninComponent},
    {path: 'signUp', component: SignupComponent},
    {path: 'home', component: HomeComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'search', component: SearchComponent},
    {
        path: 'profile/:id', component: ProfileComponent,
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
    {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
