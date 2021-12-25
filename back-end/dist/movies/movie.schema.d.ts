export declare class MovieType {
    id: any;
    title?: string;
    poster_path?: string;
}
export declare class PaginatorInput {
    query: string;
    page: number;
}
export declare class LikeAndWatchType {
    likedMovies?: any[];
    watchListMovies?: MovieType[];
}
export declare class ActionRespenseType {
    done: boolean;
}
