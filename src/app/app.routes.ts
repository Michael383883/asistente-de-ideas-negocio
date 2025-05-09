import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IdeasComponent } from './ideas/ideas.component';
import { CrearComponent } from './crear/crear.component';
import { IdeaGeneratorComponent } from './idea-generator/idea-generator.component';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'ideas', component: IdeasComponent, canActivate: [authGuard] },
    { path: 'crear', component: CrearComponent, canActivate: [authGuard] },
    { path: 'ideacrea', component: IdeaGeneratorComponent, canActivate: [authGuard] },
    { path: 'idealist', component: IdeaListComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login' }
];