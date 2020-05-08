export interface PaginatedResponse<R> {
    count: number;
    results: R[];
    next: string | null;
    previous: string | null;
}

export interface Theme {
    id: number;
    title: string;
    is_series: boolean;
    n_photos: number;
}

export interface Contest {
    id: number;
    title: string;
    themes: Theme[];
    start_date: string;
    end_date: string;
}
