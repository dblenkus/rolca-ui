export interface ImageModel {
    id: number;
    file: File | undefined;
}

export interface ImageError {
    error: string | null;
}

export interface SubmissionMeta {
    imageNumber: number;
    showDescription: boolean;
}

export interface SubmissionModel {
    id: number;
    title: string | undefined;
    description: string | undefined;
    files: ImageModel[];
}

export interface SubmissionError {
    titleError: string | null;
    imageErrors: {
        [index: number]: ImageError;
    };
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
    submissionErrors: {
        [index: number]: SubmissionError;
    };
}

export interface ContestErrors {
    themeErrors: {
        [index: number]: ThemeError;
    };
}
