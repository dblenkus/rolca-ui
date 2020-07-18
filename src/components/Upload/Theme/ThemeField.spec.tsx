import React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { themeMock } from '../../../utils/tests/mocks';

import ThemeField, { ThemeFieldProps } from './ThemeField';
import SubmissionField, { SubmissionFieldProps } from '../Submission/SubmissionField';

describe('ImageField', () => {
    let wrapper: ShallowWrapper<ThemeFieldProps>;
    let submissionElements: ShallowWrapper<SubmissionFieldProps>;
    const handleSubmissionUpdateFn = jest.fn();
    const handleImageUpdateFn = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <ThemeField
                theme={themeMock}
                handleSubmissionChange={handleSubmissionUpdateFn}
                handleImageChange={handleImageUpdateFn}
            />,
        ).dive();
        submissionElements = wrapper.find(SubmissionField);

        handleImageUpdateFn.mockClear();
    });

    it('should have two submission fields', () => {
        expect(submissionElements.length).toBe(2);
    });

    it('should render two different submissions', () => {
        const imageIds = submissionElements.map((s) => s.prop('submission').meta.id);
        expect(imageIds).toEqual([1, 2]);
    });

    it('should pass image changes', () => {
        const payload = { file: imageFile };
        imageElements.first().prop('handleImageChange')(payload);
        expect(handleImageUpdateFn.mock.calls).toEqual([[1, payload]]);
    });

    it('should pass description changes', () => {
        const payload = { name: 'description', value: 'New description' };
        descriptionField.first().prop('onChange')(payload);
        expect(handleSubmissionUpdateFn.mock.calls).toEqual([[payload]]);
    });
});
