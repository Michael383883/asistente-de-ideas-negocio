import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { IdeaGeneratorComponent } from '../idea-generator/idea-generator.component';
import { IdeaListComponent } from '../idea-list/idea-list.component';
import { IdeaService } from './services/idea.service';

const routes: Routes = [
    { path: 'crear', component: IdeaGeneratorComponent },
    { path: 'mis-ideas', component: IdeaListComponent },
    { path: '', redirectTo: 'crear', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        IdeaGeneratorComponent,
        IdeaListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        IdeaService
    ],
    exports: [
        IdeaGeneratorComponent,
        IdeaListComponent
    ]
})
export class IdeaModule { }