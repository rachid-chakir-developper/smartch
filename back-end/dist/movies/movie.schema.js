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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionRespenseType = exports.LikeAndWatchType = exports.PaginatorInput = exports.MovieType = void 0;
const graphql_1 = require("@nestjs/graphql");
let MovieType = class MovieType {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.ID, { nullable: true }),
    __metadata("design:type", Object)
], MovieType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieType.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieType.prototype, "poster_path", void 0);
MovieType = __decorate([
    (0, graphql_1.ObjectType)()
], MovieType);
exports.MovieType = MovieType;
let PaginatorInput = class PaginatorInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaginatorInput.prototype, "query", void 0);
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    __metadata("design:type", Number)
], PaginatorInput.prototype, "page", void 0);
PaginatorInput = __decorate([
    (0, graphql_1.InputType)()
], PaginatorInput);
exports.PaginatorInput = PaginatorInput;
let LikeAndWatchType = class LikeAndWatchType {
};
__decorate([
    (0, graphql_1.Field)(type => [graphql_1.ID], { nullable: true }),
    __metadata("design:type", Array)
], LikeAndWatchType.prototype, "likedMovies", void 0);
__decorate([
    (0, graphql_1.Field)(type => [MovieType], { nullable: true }),
    __metadata("design:type", Array)
], LikeAndWatchType.prototype, "watchListMovies", void 0);
LikeAndWatchType = __decorate([
    (0, graphql_1.ObjectType)()
], LikeAndWatchType);
exports.LikeAndWatchType = LikeAndWatchType;
let ActionRespenseType = class ActionRespenseType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ActionRespenseType.prototype, "done", void 0);
ActionRespenseType = __decorate([
    (0, graphql_1.ObjectType)()
], ActionRespenseType);
exports.ActionRespenseType = ActionRespenseType;
//# sourceMappingURL=movie.schema.js.map