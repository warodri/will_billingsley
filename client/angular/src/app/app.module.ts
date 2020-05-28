import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/main/app.component';
import { ViewBookComponent } from './components/books/view/view.component';
import { AddBookComponent } from './components/books/add/add.component';
import { EditBookComponent } from './components/books/edit/edit.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'book-add',
        component: AddBookComponent,
        data: { title: 'Add new Book' }
    },
    {
        path: 'book-detail/:id',
        component: ViewBookComponent,
        data: { title: 'View Book Details' }
    },
    {
        path: 'book-edit/:id',
        component: EditBookComponent,
        data: { title: 'Edit Book' }
    }
];

@NgModule({
    declarations: [
        AppComponent,
        ViewBookComponent,
        AddBookComponent,
        EditBookComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule, 
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(
            routes
        ),
    ],
    exports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
