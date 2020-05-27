import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBooksComponent } from './components/books/all/all.component';
import { ViewBookComponent } from './components/books/view/view.component';
import { AddBookComponent } from './components/books/add/add.component';
import { EditBookComponent } from './components/books/edit/edit.component';


const routes: Routes = [
    {
        path: 'books',
        component: AllBooksComponent,
        data: { title: 'List of Books'}
    },
    {
        path: 'book-add',
        component: AddBookComponent,
        data: { title: 'Add new Book'}
    },
    {
        path: 'book-detail/:id',
        component: ViewBookComponent,
        data: { title: 'View Book Details'}
    },
    {
        path: 'book-edit/:id',
        component: EditBookComponent,
        data: { title: 'Edit Book'}
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
