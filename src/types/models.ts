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
