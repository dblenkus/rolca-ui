export interface ImageModel {
    id: number;
    file: File | undefined;
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
