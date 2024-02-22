import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadMovieDetails(id);
    });
  }

  loadMovieDetails(id: string): void {
    this.movieService.getMovieDetails(id)
      .subscribe(
        (data) => {
          if (data) {
            console.log('Movie Detail:', data);
            this.movie = data;
          } else {
            console.log('Movie not found.');
          }
        },
        (error) => {
          console.error('Terjadi kesalahan saat mengambil detail film:', error);
        }
      );
  }
}
