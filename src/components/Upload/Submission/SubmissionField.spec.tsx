import React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { imageFile, singleSubmissionMock, seriesSubmissionMock } from '../../../utils/tests/mocks';

import ImageField, { ImageFieldProps } from '../Image/ImageField';
import DescriptionField, { DescriptionFieldProps } from './DescriptionField';
import TitleField, { TitleFieldProps } from './TitleField';
import SubmissionField, { SubmissionFieldProps } from './SubmissionField';

describe('SubmissionField', () => {
    let wrapper: ShallowWrapper<SubmissionFieldProps>;
    let imageElements: ShallowWrapper<ImageFieldProps>;
    let titleField: ShallowWrapper<TitleFieldProps>;
    let descriptionField: ShallowWrapper<DescriptionFieldProps>;
    const handleSubmissionUpdateFn = jest.fn();
    const handleImageUpdateFn = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <SubmissionField
                submission={seriesSubmissionMock}
                handleSubmissionChange={handleSubmissionUpdateFn}
                handleImageChange={handleImageUpdateFn}
            />,
        );
        imageElements = wrapper.find(ImageField);
        titleField = wrapper.find(TitleField);
        descriptionField = wrapper.find(DescriptionField);

        handleImageUpdateFn.mockClear();
    });

    it('should have two image fields', () => {
        expect(imageElements.length).toBe(2);
    });

    it('should render two different images', () => {
        const imageIds = imageElements.map((i) => i.prop('image').meta.id);
        expect(imageIds).toEqual([1, 2]);
    });

    it('should pass image changes', () => {
        const payload = { file: imageFile };
        imageElements.first().prop('handleImageChange')(payload);
        expect(handleImageUpdateFn.mock.calls).toEqual([[1, payload]]);
    });

    describe('single submission', () => {
        beforeEach(() => {
            wrapper = shallow(
                <SubmissionField
                    submission={singleSubmissionMock}
                    handleSubmissionChange={handleSubmissionUpdateFn}
                    handleImageChange={handleImageUpdateFn}
                />,
            ).dive();

            titleField = wrapper.find(TitleField);
            descriptionField = wrapper.find(DescriptionField);
        });

        // it('should have the title field', () => {
        //     expect(titleField.length).toBe(1);
        // });

        // it('should not have the description field', () => {
        //     expect(descriptionField.length).toBe(0);
        // });
    });

    describe('series submission', () => {
        // it('should have the title field', () => {
        //     expect(titleField.length).toBe(1);
        // });

        // it('should have the description field', () => {
        //     expect(descriptionField.length).toBe(1);
        // });

        it('should pass description changes', () => {
            const payload = { name: 'description', value: 'New description' };
            descriptionField.first().prop('descriptionField').onChange(payload);
            expect(handleSubmissionUpdateFn.mock.calls).toEqual([[payload]]);
        });
    });
});
