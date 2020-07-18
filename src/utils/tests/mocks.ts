import { Contest } from '../../store/contests/types';
import { ImageModel, SubmissionModel, ThemeModel } from '../../types/models';

export const imageFile = new File([''], 'reddot.jpg', { type: 'image/jpeg' });

export const imageUrl =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wCEABQQEBkSGScXFycyJh8mMi4mJiYmLj41NTU1NT5EQUFBQUFBREREREREREREREREREREREREREREREREREREREQBFRkZIBwgJhgYJjYmICY2RDYrKzZERERCNUJERERERERERERERERERERERERERERERERERERERERERERERERERP/AABEIAAEAAQMBIgACEQEDEQH/xABMAAEBAAAAAAAAAAAAAAAAAAAABQEBAQAAAAAAAAAAAAAAAAAABQYQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJQA9Yv/2Q==';

const imageFactory = (
    id: number,
    file: File | undefined,
    url: string,
    fileError: string | null,
): ImageModel => ({
    meta: { id },
    file,
    url,
    errors: { hasError: !!fileError, file: fileError },
});

const submissionFactory = (
    id: number,
    images: ImageModel[],
    isSeries: boolean,
    titleError: string | null,
    descriptionError: string | null,
): SubmissionModel => ({
    meta: {
        id,
        imageNumber: images.length,
        isSeries: isSeries,
        titleRequired: isSeries,
        descriptionRequired: isSeries,
    },
    errors: {
        hasError: !!titleError || !!descriptionError,
        title: titleError,
        description: descriptionError,
    },
    images,
    title: 'Series submission',
    description: 'This is series submission',
});

const themeFactory = (id: number): ThemeModel => ({
    meta: {
        id,
        title: 'Test theme',
    },
    submissions: [],
    errors: {
        hasError: false,
    },
});

export const contestMock: Contest = {
    id: 1,
    title: 'Mocked contest',
    description: 'This is a mocked contest.',
    notice_html: '<h1>Mocked contest</h1><p>This is a mocked contest.</p>',
    header_image: 'https://example.com/header_image.png',
    themes: [],
    start_date: '2020-01-01T00:00:00Z',
    end_date: '2020-12-31T23:59:59Z',
};

export const emptyImageMock = imageFactory(1, undefined, '', null);
export const imageMock = imageFactory(2, imageFile, imageUrl, null);
export const errorImageMock = imageFactory(3, imageFile, imageUrl, 'An error');

export const singleSubmissionMock = submissionFactory(
    2,
    [imageFactory(1, undefined, '', null)],
    false,
    null,
    null,
);
export const seriesSubmissionMock = submissionFactory(
    2,
    [imageFactory(1, undefined, '', null), imageFactory(2, undefined, '', null)],
    true,
    null,
    null,
);

export const themeMock = themeFactory(1);
