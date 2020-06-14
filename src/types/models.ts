export interface InputChange {
    name: string;
    value: string;
}

export interface FileChange {
    file: File;
    url: string;
}

export interface ImageError {
    hasError: boolean;
    file: string | null;
}

export interface ImageMeta {
    id: number;
}

export interface ImageModel {
    meta: ImageMeta;
    file: File | undefined;
    url: string;
    errors: ImageError;
}

export interface SubmissionError {
    hasError: boolean;
    title: string | null;
    description: string | null;
}

export interface SubmissionMeta {
    id: number;
    imageNumber: number;
    isSeries: boolean;
    titleRequired: boolean;
    descriptionRequired: boolean;
}

export interface SubmissionModel {
    meta: SubmissionMeta;
    title: string;
    description: string;
    images: ImageModel[];
    errors: SubmissionError;
}

export interface ThemeError {
    hasError: boolean;
}

export interface ThemeMeta {
    id: number;
    title: string;
}

export interface ThemeModel {
    meta: ThemeMeta;
    submissions: SubmissionModel[];
    errors: ThemeError;
}

export interface AuthorError {
    hasError: boolean;
    first_name: string | null;
    last_name: string | null;
}

export interface AuthorModel {
    first_name: string;
    last_name: string;
    errors: AuthorError;
}

export interface ContestError {
    hasError: boolean;
}

export interface ContestMeta {
    title: string;
    description: string;
    noticeHtml: string;
    headerImage: string | null;
}

export interface ContestModel {
    meta: ContestMeta;
    author: AuthorModel;
    themes: ThemeModel[];
    errors: ContestError;
}
