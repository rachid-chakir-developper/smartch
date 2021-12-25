"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const constants_1 = require("./constants");
const rxjs_1 = require("rxjs");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../user/user.model");
let MoviesService = class MoviesService {
    constructor(httpService, userModel) {
        this.httpService = httpService;
        this.userModel = userModel;
        this.url = `${constants_1.MoviesConstants.moviesUri}?api_key=${constants_1.MoviesConstants.dbApiKey}`;
    }
    findAll({ query = ' ', page = 1 }) {
        if (query === '')
            query = ' ';
        let url = this.url += `&query=${query}&page=${page}`;
        try {
            return this.httpService.get(url).pipe((0, rxjs_1.map)(response => response.data.results));
        }
        catch (err) {
            console.error(err);
        }
    }
    async findLikeAndWatchList(paylod) {
        const user = await this.userModel.findOne({ _id: paylod._id });
        let url = this.url += `&query=a&page=1`;
        try {
            return this.httpService.get(url).pipe((0, rxjs_1.map)(response => {
                let watchListMovies = [];
                watchListMovies = response.data.results.filter(m => user.watchListMovies.includes(m.id));
                return {
                    likedMovies: user.likedMovies,
                    watchListMovies
                };
            }));
        }
        catch (err) {
            console.error(err);
        }
    }
    async likeThisMovie(paylod, id) {
        const user = await this.userModel.findOne({ _id: paylod._id });
        try {
            if (user.likedMovies.includes(id)) {
                return user.updateOne({ $pull: { likedMovies: id } });
            }
            else {
                return user.updateOne({ $push: { likedMovies: id } });
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    async addMovieToWatchList(paylod, id) {
        const user = await this.userModel.findOne({ _id: paylod._id });
        try {
            if (user.watchListMovies.includes(id)) {
                return user.updateOne({ $pull: { watchListMovies: id } });
            }
            else {
                return user.updateOne({ $push: { watchListMovies: id } });
            }
        }
        catch (err) {
            console.error(err);
        }
    }
};
MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        mongoose_2.Model])
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map