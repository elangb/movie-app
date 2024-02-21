import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  page = 1; // Inisialisasi page dengan nilai 1
  query = '';
  modalImage: string | undefined;
  selectedMovie: any;
  private searchSubscription: Subscription | undefined;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.searchMovies();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  searchMovies(): void {
    this.searchSubscription = this.movieService.searchMovies(this.query, this.page)
      .subscribe(data => {
        this.movies = data.Search || [];
      });
  }

  showModal(movie: any): void {
    this.selectedMovie = movie;
    const modal = document.getElementById('myModal');
  
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  closeModal(): void {
    const modal = document.getElementById('myModal');
  
    if (modal) {
      modal.style.display = 'none';
    }
  }

  Array(length: number): number[] {
    return new Array(length);
  }
}
