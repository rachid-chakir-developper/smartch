import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { MovieType } from './movie.schema';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.model';
export declare class MoviesService {
    private httpService;
    private userModel;
    url: string;
    constructor(httpService: HttpService, userModel: Model<UserDocument>);
    findAll({ query, page }: {
        query?: string;
        page?: number;
    }): Observable<MovieType[]>;
    findLikeAndWatchList(paylod: any): Promise<any>;
    likeThisMovie(paylod: any, id: any): Promise<any>;
    addMovieToWatchList(paylod: any, id: any): Promise<any>;
}
