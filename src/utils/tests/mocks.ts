import { Contest } from '../../types/api';

export const contestMock: Contest = {
    id: 42,
    created: '2026-01-01T00:00:00Z',
    modified: '2026-01-01T00:00:00Z',
    title: 'Contest title',
    description: 'Contest description',
    themes: [],
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    notice_html: '',
    confirmation_html: '',
    header_image: null,
    dob_required: false,
    club_show: false,
    club_required: false,
    school_show: false,
    school_required: false,
};
