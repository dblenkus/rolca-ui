export interface PaginatedResponse<R> {
    count: number;
    results: R[];
    next: string | null;
    previous: string | null;
}

export interface BaseResource {
    id: number;
    created: string;
    modified: string;
}

export interface Image extends BaseResource {
    file: string;
}

export interface Author extends BaseResource {
    first_name: string;
    last_name: string;
    email: string;
}

export interface Submission extends BaseResource {
    theme: number;
    author: Author;
    title: string;
    description: string;
    files: Image[];
}

export interface SubmissionSet extends BaseResource {
    submissions: Submission[];
}

export interface Theme extends BaseResource {
    title: string;
    is_series: boolean;
    n_photos: number;
}

export interface Contest extends BaseResource {
    title: string;
    description: string;
    themes: Theme[];
    start_date: string;
    end_date: string;
    notice_html: string;
    confirmation_html: string;
    header_image: string | null;
}

export interface Payment extends BaseResource {
    submissionset: number;
    paid: boolean;
}
