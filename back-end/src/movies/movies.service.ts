import {  Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MoviesConstants } from './constants';
import { map, Observable } from 'rxjs';
import { LikeAndWatchType, MovieType } from './movie.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.model';

@Injectable()
export class MoviesService {
    url : string;
    constructor(private httpService: HttpService,
         @InjectModel(User.name) private userModel: Model<UserDocument>
      ) {
          this.url = `${MoviesConstants.moviesUri}?api_key=${MoviesConstants.dbApiKey}`
      }
    findAll({query = ' ', page = 1}): Observable<MovieType[]>{
        if(query === '') query = ' ';
        let url = this.url += `&query=${query}&page=${page}`;
        try{
            return this.httpService.get(url).pipe(
                map(response => <MovieType[]>response.data.results)
            );
        } catch (err) {
            console.error(err);
        }
    }

    async findLikeAndWatchList(paylod): Promise<any> {
        const user = await this.userModel.findOne({ _id: paylod._id });
        let url = this.url += `&query=a&page=1`;
        try{
            return this.httpService.get(url).pipe(
                map(response =>{
                    let watchListMovies = []
                    watchListMovies = response.data.results.filter(m => user.watchListMovies.includes(m.id))
                    return <LikeAndWatchType>{
                        likedMovies: user.likedMovies,
                        watchListMovies
                    };
                })
            );
        } catch (err) {
            console.error(err);
        }
    }

    async likeThisMovie(paylod, id){
        const user = await this.userModel.findOne({ _id: paylod._id });      
        try{
            if(user.likedMovies.includes(id)){
                return user.updateOne({$pull : { likedMovies: id }})
            }else{
                return user.updateOne({$push : { likedMovies: id }})
            }
        } catch (err) {
            console.error(err);
        }
    }
    async addMovieToWatchList(paylod, id){
        const user = await this.userModel.findOne({ _id: paylod._id }); 
        try{
            if(user.watchListMovies.includes(id)){
                return user.updateOne({$pull : { watchListMovies: id }})
            }else{
                return user.updateOne({$push : { watchListMovies: id }})
            }
        } catch (err) {
            console.error(err);
        }
    }
}
