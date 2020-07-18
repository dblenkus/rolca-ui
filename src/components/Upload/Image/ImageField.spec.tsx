import React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { emptyImageMock, errorImageMock, imageMock, imageUrl } from '../../../utils/tests/mocks';

import ImageButtons, { ImageButtonsProps } from './ImageButtons';
import ImageField, { ImageFieldProps } from './ImageField';
import ShowImage, { ShowImageProps } from './ShowImage';

describe('ImageField', () => {
    let wrapper: ShallowWrapper<ImageFieldProps>;
    let buttonElements: ShallowWrapper<ImageButtonsProps>;
    let showElements: ShallowWrapper<ShowImageProps>;
    const handleImageUpdateFn = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <ImageField image={emptyImageMock} handleImageChange={handleImageUpdateFn} />,
        );
        buttonElements = wrapper.find(ImageButtons);
        showElements = wrapper.find(ShowImage);

        handleImageUpdateFn.mockClear();
    });

    it('should pass an empty url', () => {
        expect(showElements.prop('src')).toEqual('');
    });

    it('should not have an error', () => {
        expect(showElements.prop('error')).toBeFalsy();
    });

    it('should pass remove function to buttons', () => {
        buttonElements.prop('handleRemove')();
        expect(handleImageUpdateFn.mock.calls.length).toBe(1);
    });

    // it('should pass change function to buttons', () => {
    //     buttonElements.props().handleChange();
    //     expect(handleImageUpdateFn.mock.calls.length).toBe(1);
    // });

    it('should pass false as image selected', () => {
        expect(buttonElements.prop('imageSelected')).toBeFalsy();
    });

    describe('select image', () => {
        beforeEach(() => {
            wrapper.setProps({ image: imageMock });
            buttonElements = wrapper.find(ImageButtons);
            showElements = wrapper.find(ShowImage);
        });

        it('should pass the image url', () => {
            expect(showElements.prop('src')).toEqual(imageUrl);
        });

        it('should not have an error', () => {
            expect(showElements.prop('error')).toBeFalsy();
        });

        it('should pass true as image selected', () => {
            expect(buttonElements.prop('imageSelected')).toBeTruthy();
        });
    });

    describe('select image with an error', () => {
        beforeEach(() => {
            wrapper.setProps({ image: errorImageMock });
            buttonElements = wrapper.find(ImageButtons);
            showElements = wrapper.find(ShowImage);
        });

        it('should pass the image url', () => {
            expect(showElements.prop('src')).toEqual(imageUrl);
        });

        it('should have an error', () => {
            expect(showElements.prop('error')).toBeTruthy();
        });

        it('should pass true as image selected', () => {
            expect(buttonElements.prop('imageSelected')).toBeTruthy();
        });
    });
});
