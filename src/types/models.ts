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
    title: string | null;
    images: ImageError[];
}

export interface ThemeModel {
    id: number;
    title: string;
    submissions: SubmissionModel[];
}

export interface ThemeError {
    id: number;
    submissions: SubmissionError[];
}

export interface AuthorModel {
    first_name: string;
    last_name: string;
    email: string;
}

export interface AuthorError {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
}

export interface ContestModel {
    title: string;
    author: AuthorModel;
    themes: ThemeModel[];
}

export interface ContestError {
    author: AuthorError;
    themes: ThemeError[];
}
