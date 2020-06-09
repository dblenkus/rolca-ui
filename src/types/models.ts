export interface InputChange {
    name: string;
    value: string;
}

export interface FileChange {
    file: File;
    url: string;
}

export interface ImageModel {
    id: number;
    file: File | undefined;
    url: string;
}

export interface ImageError {
    id: number;
    hasError: boolean;
    file: string | null;
}

export interface SubmissionModel {
    id: number;
    isSeries: boolean;
    title: string;
    titleRequired: boolean;
    description: string;
    descriptionRequired: boolean;
    images: ImageModel[];
}

export interface SubmissionError {
    id: number;
    hasError: boolean;
    title: string | null;
    description: string | null;
    images: ImageError[];
}

export interface ThemeModel {
    id: number;
    title: string;
    submissions: SubmissionModel[];
}

export interface ThemeError {
    id: number;
    hasError: boolean;
    submissions: SubmissionError[];
}

export interface AuthorModel {
    first_name: string;
    last_name: string;
    email: string;
}

export interface AuthorError {
    hasError: boolean;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
}

export interface ContestModel {
    title: string;
    noticeHtml: string;
    headerImage: string | null;
    author: AuthorModel;
    themes: ThemeModel[];
}

export interface ContestError {
    hasError: boolean;
    author: AuthorError;
    themes: ThemeError[];
}
