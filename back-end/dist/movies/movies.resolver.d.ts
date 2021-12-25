import { User } from 'src/user/user.model';
import { MovieType, PaginatorInput } from './movie.schema';
import { MoviesService } from './movies.service';
export declare class MoviesResolver {
    private moviesService;
    constructor(moviesService: MoviesService);
    likeThisMovie(user: User, id: number): Promise<{
        done: boolean;
    }>;
    addMovieToWatchList(user: User, id: number): Promise<{
        done: boolean;
    }>;
    movies(paginatorInput: PaginatorInput): Promise<MovieType[]>;
    likedMovies(user: User): Promise<any[]>;
    likeAndWatchList(user: User): Promise<any>;
}
