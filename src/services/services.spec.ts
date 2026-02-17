import AuthorService from './AuthorService';
import ContestService from './ContestService';
import ImageService from './ImageService';
import InstitutionService from './InstitutionService';
import JudgeContestService from './JudgeContestService';
import JudgeSubmissionService from './JudgeSubmissionService';
import PaymentService from './PaymentService';
import RatingService from './RatingService';
import ResultsSubmissionService from './ResultsSubmissionService';
import ResultsThemeService from './ResultsThemeService';
import SubmissionService from './SubmissionService';
import SubmissionSetService from './SubmissionSetService';
import UserService from './UserService';

import { apiClient } from './Base';

jest.mock('./Base', () => ({
    apiClient: {
        get: jest.fn(),
        post: jest.fn(),
        delete: jest.fn(),
    },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('services', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls contest endpoints', () => {
        ContestService.getContests();
        ContestService.getActiveContests();
        ContestService.getContest('12');

        expect(mockedApiClient.get).toHaveBeenNthCalledWith(1, '/contest');
        expect(mockedApiClient.get).toHaveBeenNthCalledWith(2, '/contest', {
            params: { is_active: true },
        });
        expect(mockedApiClient.get).toHaveBeenNthCalledWith(3, '/contest/12');
    });

    it('calls institution and jury endpoints', () => {
        InstitutionService.getInstitutions();
        JudgeContestService.getContests();
        JudgeSubmissionService.getSubmissionsByContest(3);
        JudgeSubmissionService.getSubmissionsByTheme(9);

        expect(mockedApiClient.get).toHaveBeenCalledWith('/institution', {
            params: { page_size: 1000 },
        });
        expect(mockedApiClient.get).toHaveBeenCalledWith('/judge/contest');
        expect(mockedApiClient.get).toHaveBeenCalledWith('/judge/submission', {
            params: { contest: 3 },
        });
        expect(mockedApiClient.get).toHaveBeenCalledWith('/judge/submission', {
            params: { theme: 9 },
        });
    });

    it('calls payment and rating endpoints', () => {
        PaymentService.updatePayment(5, true);
        PaymentService.getBySubmissionSets([1, 2, 3]);
        RatingService.getForSubmission(7);
        RatingService.getForTheme(8);
        RatingService.updateForSubmission(9, 4);

        expect(mockedApiClient.post).toHaveBeenCalledWith('/payment', {
            submissionset: 5,
            paid: true,
        });
        expect(mockedApiClient.get).toHaveBeenCalledWith('/payment', {
            params: {
                submissionset__in: '1,2,3',
                page_size: 3,
            },
        });
        expect(mockedApiClient.get).toHaveBeenCalledWith('/rating', {
            params: { submission: 7 },
        });
        expect(mockedApiClient.get).toHaveBeenCalledWith('/rating', {
            params: { theme: 8 },
        });
        expect(mockedApiClient.post).toHaveBeenCalledWith('/rating', {
            submission: 9,
            rating: 4,
        });
    });

    it('calls submission and result endpoints', () => {
        SubmissionService.createSubmissions([{ a: 1 }]);
        SubmissionService.deleteSubmission(1);
        SubmissionService.getSubmissionsByContest(2);
        SubmissionService.getSubmissionsByTheme(3);

        SubmissionSetService.getSubmissionSet('4');
        SubmissionSetService.getByContest('5', 6, 7);
        SubmissionSetService.deleteSubmissionSet(8);

        ResultsSubmissionService.get('9');
        ResultsSubmissionService.getOverview('10');
        ResultsThemeService.getResults('11');

        expect(mockedApiClient.post).toHaveBeenCalledWith('/submission', [{ a: 1 }]);
        expect(mockedApiClient.delete).toHaveBeenCalledWith('/submission/1');
        expect(mockedApiClient.get).toHaveBeenCalledWith('/submission', {
            params: { contest: 2 },
        });
        expect(mockedApiClient.get).toHaveBeenCalledWith('/submission', {
            params: { theme: 3 },
        });

        expect(mockedApiClient.get).toHaveBeenCalledWith('/submissionset/4');
        expect(mockedApiClient.get).toHaveBeenCalledWith('/submissionset', {
            params: { contest: '5', page: 6, page_size: 7 },
        });
        expect(mockedApiClient.delete).toHaveBeenCalledWith('/submissionset/8');

        expect(mockedApiClient.get).toHaveBeenCalledWith('/results/submission/9');
        expect(mockedApiClient.get).toHaveBeenCalledWith('/results/submission', {
            params: { ordering: '-rating_sum', page_size: 500, theme: '10' },
        });
        expect(mockedApiClient.get).toHaveBeenCalledWith('/results/theme/11');
    });

    it('calls user endpoints', () => {
        UserService.login({ email: 'a', password: 'b' });
        UserService.register({} as any);
        UserService.activateUser({ token: 't' });
        UserService.requestPasswordReset({ email: 'a' });
        UserService.passwordReset({ token: 't', new_password: 'n' });

        expect(mockedApiClient.post).toHaveBeenCalledWith('/user/login', {
            email: 'a',
            password: 'b',
        });
        expect(mockedApiClient.post).toHaveBeenCalledWith('/user', {});
        expect(mockedApiClient.post).toHaveBeenCalledWith('/user/activate_account', {
            token: 't',
        });
        expect(mockedApiClient.post).toHaveBeenCalledWith('/user/request_password_reset', {
            email: 'a',
        });
        expect(mockedApiClient.post).toHaveBeenCalledWith('/user/password_reset', {
            token: 't',
            new_password: 'n',
        });
    });

    it('sanitizes optional author fields and uploads author', () => {
        const payload = {
            first_name: 'A',
            last_name: 'B',
            dob: '',
            school: '',
            mentor: '',
            club: '',
            distinction: '',
        };

        AuthorService.create(payload as any);

        expect(mockedApiClient.post).toHaveBeenCalledWith('/author', {
            first_name: 'A',
            last_name: 'B',
        });
    });

    it('keeps optional author fields when they are non-empty', () => {
        const payload = {
            first_name: 'A',
            last_name: 'B',
            dob: '2000-01-01',
            school: 'School',
            mentor: 'Mentor',
            club: 'Club',
            distinction: 'Distinction',
        };

        AuthorService.create(payload as any);

        expect(mockedApiClient.post).toHaveBeenCalledWith('/author', payload);
    });

    it('uploads image with sanitized filename and headers', () => {
        const image = new File(['a'], 'my\u0007image.jpg', { type: 'image/jpeg' });
        ImageService.uploadImage(image);

        expect(mockedApiClient.post).toHaveBeenCalledWith('/file', image, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'attachment; filename=my image.jpg',
            },
        });
    });
});
