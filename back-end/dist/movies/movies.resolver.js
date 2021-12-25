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
exports.MoviesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_model_1 = require("../user/user.model");
const movie_schema_1 = require("./movie.schema");
const movies_service_1 = require("./movies.service");
let MoviesResolver = class MoviesResolver {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    async likeThisMovie(user, id) {
        let done = false;
        try {
            await this.moviesService.likeThisMovie(user, id).then(() => {
                done = true;
            });
            return {
                done
            };
        }
        catch (err) {
            console.error(err);
        }
    }
    async addMovieToWatchList(user, id) {
        let done = false;
        try {
            await this.moviesService.addMovieToWatchList(user, id).then(() => {
                done = true;
            });
            return {
                done
            };
        }
        catch (err) {
            console.error(err);
        }
    }
    async movies(paginatorInput) {
        return this.moviesService.findAll(paginatorInput).toPromise();
    }
    async likedMovies(user) {
        return user.watchListMovies;
    }
    async likeAndWatchList(user) {
        return this.moviesService.findLikeAndWatchList(user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => movie_schema_1.ActionRespenseType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, Number]),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "likeThisMovie", null);
__decorate([
    (0, graphql_1.Mutation)(() => movie_schema_1.ActionRespenseType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, Number]),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "addMovieToWatchList", null);
__decorate([
    (0, graphql_1.Query)(returns => [movie_schema_1.MovieType]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movie_schema_1.PaginatorInput]),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "movies", null);
__decorate([
    (0, graphql_1.Query)(returns => [graphql_1.ID]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "likedMovies", null);
__decorate([
    (0, graphql_1.Query)(returns => movie_schema_1.LikeAndWatchType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "likeAndWatchList", null);
MoviesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesResolver);
exports.MoviesResolver = MoviesResolver;
//# sourceMappingURL=movies.resolver.js.map