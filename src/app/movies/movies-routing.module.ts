import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from 'src/app/movies/movie-detail/movie-detail.component';
import { MoviesComponent } from 'src/app/movies/movies.component';

const routes: Routes = [{
  path: '',
  component: MoviesComponent,
},
{
  path: ':title',
  component: MovieDetailComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
