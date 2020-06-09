export interface PaginatedResponse<R> {
    count: number;
    results: R[];
    next: string | null;
    previous: string | null;
}

export interface Image {
    id: number;
    file: string;
}

export interface Author {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface Submission {
    id: number;
    title: string;
    description: string;
    images: Image[];
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
    description: string;
    themes: Theme[];
    start_date: string;
    end_date: string;
    notice_html: string;
    header_image: string | null;
}
