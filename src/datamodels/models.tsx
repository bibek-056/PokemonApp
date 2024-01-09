export interface Response {
    count: number;
    next? : string;
    previous? : string;
    results: Array<Result>
}

export interface Result {
    name: string;
    url: string
}