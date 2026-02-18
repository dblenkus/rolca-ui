import reducer from './reducer';
import authorReducer from './reducerAuthor';
import imageReducer from './reducerImage';
import submissionReducer from './reducerSubmission';
import themeReducer from './reducerTheme';
import {
    authorUpdate,
    imageStore,
    imageUpdate,
    submissionUpdate,
    themeInit,
    uploadInit,
    uploadSetContest,
    uploadSetRedirect,
    uploadSetUploading,
    uploadSubmit,
    uploadUnsetUploading,
} from './actions';
import {
    AUTHOR_UPDATE,
    IMAGE_INIT,
    IMAGE_STORE,
    SUBMISSION_INIT,
    SUBMISSION_UPDATE,
    THEME_INIT,
    UPLOAD_INIT,
    UPLOAD_SET_CONTEST,
    UPLOAD_SET_REDIRECT,
    UPLOAD_SET_UPLOADING,
    UPLOAD_UNSET_UPLOADING,
} from './types';
import {
    getEmptyAuthor,
    getEmptyContest,
    getEmptyImage,
    getEmptySubmission,
    getEmptyTheme,
} from './utils';

import imageReader from '../../utils/imageReader';
import upload from '../../utils/upload';
import validate from '../../utils/validate';

vi.mock('../../utils/imageReader', () => ({
    __esModule: true,
    default: vi.fn(),
}));

vi.mock('../../utils/upload', () => ({
    __esModule: true,
    default: vi.fn(),
}));

vi.mock('../../utils/validate', () => ({
    __esModule: true,
    default: vi.fn(),
}));

const mockedImageReader = imageReader as vi.Mock;
const mockedUpload = upload as vi.Mock;
const mockedValidate = validate as vi.Mock;

describe('upload store', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('builds simple actions', () => {
        expect(uploadSetRedirect()).toEqual({ type: UPLOAD_SET_REDIRECT });
        expect(uploadSetUploading()).toEqual({ type: UPLOAD_SET_UPLOADING });
        expect(uploadUnsetUploading()).toEqual({ type: UPLOAD_UNSET_UPLOADING });
        expect(authorUpdate({ name: 'first_name', value: 'Ana' })).toEqual({
            type: AUTHOR_UPDATE,
            payload: { name: 'first_name', value: 'Ana' },
        });
    });

    it('returns empty state helpers', () => {
        expect(getEmptyContest().meta.title).toBe('');
        expect(getEmptyAuthor().errors.hasError).toBe(false);
        expect(getEmptyTheme().submissions).toEqual([]);
        expect(getEmptySubmission().images).toEqual([]);
        expect(getEmptyImage().url).toBe('');
    });

    it('handles standalone reducers', () => {
        const author = authorReducer(undefined, {
            type: AUTHOR_UPDATE,
            payload: { name: 'first_name', value: 'Eva' },
        } as any);
        expect(author.first_name).toBe('Eva');

        const image = imageReducer(undefined, {
            type: IMAGE_INIT,
            payload: { id: 5, isNew: true, isChanged: false },
        } as any);
        expect(image.meta.id).toBe(5);

        const storedImage = imageReducer(image, {
            type: IMAGE_STORE,
            payload: { file: undefined, url: 'x' },
        } as any);
        expect(storedImage.meta.isChanged).toBe(true);
        expect(storedImage.url).toBe('x');
        expect(imageReducer(storedImage, { type: 'UNKNOWN' } as any)).toEqual(storedImage);

        const submission = submissionReducer(undefined, {
            type: SUBMISSION_INIT,
            payload: {
                id: 1,
                imageNumber: 2,
                isSeries: false,
                isNew: true,
                isChanged: false,
                titleRequired: false,
                descriptionRequired: false,
            },
        } as any);
        expect(submission.images).toHaveLength(2);

        const updatedSubmission = submissionReducer(submission, {
            type: SUBMISSION_UPDATE,
            payload: { name: 'title', value: 'T' },
        } as any);
        expect(updatedSubmission.title).toBe('T');
        expect(updatedSubmission.meta.titleRequired).toBe(true);

        const submissionNoRequired = submissionReducer(updatedSubmission, {
            type: SUBMISSION_UPDATE,
            payload: { name: 'metaOnly', value: 'X' },
        } as any);
        expect((submissionNoRequired as any).metaOnly).toBe('X');

        const submissionAfterImage = submissionReducer(updatedSubmission, {
            type: IMAGE_STORE,
            image_id: 0,
            payload: { file: new File(['x'], 'a.jpg', { type: 'image/jpeg' }), url: 'u' },
        } as any);
        expect(submissionAfterImage.meta.titleRequired).toBe(true);
        expect(submissionReducer(submissionAfterImage, { type: 'UNKNOWN' } as any)).toEqual(
            submissionAfterImage,
        );

        const submissionImageIdNoMatch = submissionReducer(updatedSubmission, {
            type: IMAGE_STORE,
            image_id: 99,
            payload: { file: undefined, url: '' },
        } as any);
        expect(submissionImageIdNoMatch.images).toEqual(updatedSubmission.images);

        const theme = themeReducer(undefined, {
            type: THEME_INIT,
            payload: { id: 1, title: 'Theme', is_series: false, n_photos: 2 },
        } as any);
        expect(theme.submissions).toHaveLength(2);

        const seriesTheme = themeReducer(undefined, {
            type: THEME_INIT,
            payload: { id: 2, title: 'Series', is_series: true, n_photos: 3 },
        } as any);
        expect(seriesTheme.submissions).toHaveLength(1);
        expect(seriesTheme.submissions[0].images).toHaveLength(3);
        expect(themeReducer(seriesTheme, { type: 'UNKNOWN' } as any)).toEqual(seriesTheme);

        const themeNoSubmissionMatch = themeReducer(seriesTheme, {
            type: SUBMISSION_UPDATE,
            submission_id: 999,
            payload: { name: 'title', value: 'Never' },
        } as any);
        expect(themeNoSubmissionMatch.submissions).toEqual(seriesTheme.submissions);
    });

    it('initializes and updates top-level upload reducer', () => {
        const apiContest = {
            title: 'Contest',
            description: 'Desc',
            notice_html: '<p>Notice</p>',
            header_image: null,
            dob_required: true,
            club_show: true,
            club_required: false,
            school_show: true,
            school_required: true,
            themes: [{ id: 10, title: 'Single', is_series: false, n_photos: 2 }],
        } as any;

        const initialized = reducer(undefined, uploadInit(apiContest));
        expect(initialized.contest.meta.title).toBe('Contest');
        expect(initialized.contest.themes).toHaveLength(1);

        const newContest = {
            ...initialized.contest,
            meta: { ...initialized.contest.meta, title: 'New' },
        };
        const replaced = reducer(initialized, uploadSetContest(newContest));
        expect(replaced.contest.meta.title).toBe('New');

        expect(reducer(replaced, uploadSetRedirect()).redirect).toBe(true);
        expect(reducer(replaced, uploadSetUploading()).uploading).toBe(true);
        expect(reducer({ ...replaced, uploading: true }, uploadUnsetUploading()).uploading).toBe(
            false,
        );

        const authorUpdated = reducer(
            replaced,
            authorUpdate({ name: 'first_name', value: 'Lana' }),
        );
        expect(authorUpdated.contest.author.first_name).toBe('Lana');

        const withImage = reducer(
            replaced,
            imageStore(10, 0, 0, {
                file: new File(['x'], 'a.jpg', { type: 'image/jpeg' }),
                url: 'url',
            }),
        );
        expect(withImage.contest.themes[0].submissions[0].images[0].url).toBe('url');
    });

    it('runs uploadSubmit thunk success path', async () => {
        const contest = getEmptyContest();
        mockedValidate.mockResolvedValue({ ...contest, errors: { hasError: false } });
        mockedUpload.mockResolvedValue(undefined);

        const dispatch = vi.fn();
        const getState = () => ({ upload: { contest } });

        await uploadSubmit()(dispatch as any, getState as any);

        expect(dispatch.mock.calls[0][0]).toEqual({ type: UPLOAD_SET_UPLOADING });
        expect(mockedUpload).toHaveBeenCalledWith(contest);
        expect(dispatch).toHaveBeenCalledWith({ type: UPLOAD_SET_REDIRECT });
        expect(dispatch.mock.calls[dispatch.mock.calls.length - 1][0]).toEqual({
            type: UPLOAD_UNSET_UPLOADING,
        });
    });

    it('runs uploadSubmit thunk error path', async () => {
        const contest = getEmptyContest();
        const validatedContest = { ...contest, errors: { hasError: true } };
        mockedValidate.mockResolvedValue(validatedContest);

        const dispatch = vi.fn();
        const getState = () => ({ upload: { contest } });

        await uploadSubmit()(dispatch as any, getState as any);

        expect(mockedUpload).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith({
            type: UPLOAD_SET_CONTEST,
            payload: validatedContest,
        });
    });

    it('runs imageUpdate thunk with and without file', async () => {
        mockedImageReader.mockResolvedValue({ src: 'blob:123' });
        const dispatch = vi.fn();

        const file = new File(['x'], 'x.jpg', { type: 'image/jpeg' });
        await imageUpdate(1, 2, 3, { file })(dispatch as any);
        expect(dispatch).toHaveBeenCalledWith({
            type: IMAGE_STORE,
            theme_id: 1,
            submission_id: 2,
            image_id: 3,
            payload: { file, url: 'blob:123' },
        });

        await imageUpdate(1, 2, 4, { file: undefined })(dispatch as any);
        expect(dispatch).toHaveBeenCalledWith({
            type: IMAGE_STORE,
            theme_id: 1,
            submission_id: 2,
            image_id: 4,
            payload: { file: undefined, url: '' },
        });
    });

    it('covers helper action creators for theme and submission update', () => {
        expect(themeInit({ id: 1 } as any)).toEqual({ type: THEME_INIT, payload: { id: 1 } });
        expect(
            submissionUpdate(1, 2, {
                name: 'description',
                value: 'Some text',
            }),
        ).toEqual({
            type: SUBMISSION_UPDATE,
            theme_id: 1,
            submission_id: 2,
            payload: {
                name: 'description',
                value: 'Some text',
            },
        });
        expect(uploadInit({ title: 't' } as any)).toEqual({
            type: UPLOAD_INIT,
            payload: { title: 't' },
        });
    });
});
