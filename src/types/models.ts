export interface ImageModel {
    id: number;
    file: File | undefined;
}

export interface ImageError {
    id: number;
    file: string | null;
}

export interface SubmissionMeta {
    imageNumber: number;
    showDescription: boolean;
}

export interface SubmissionModel {
    id: number;
    title: string | undefined;
    description: string | undefined;
    images: ImageModel[];
}

export interface SubmissionError {
    id: number;
    title: string | null;
    images: ImageError[];
}

export interface ThemeMeta {
    id: number;
    imageNumber: number;
    isSeries: boolean;
    title: string;
}

export interface ThemeModel {
    id: number;
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

export interface ContestMeta {
    themes: ThemeMeta[];
}

export interface ContestModel {
    author: AuthorModel;
    themes: ThemeModel[];
}

export interface ContestError {
    author: AuthorError;
    themes: ThemeError[];
}
