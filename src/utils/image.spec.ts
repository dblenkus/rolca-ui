import { anyImage, countImages } from './image';
import { ImageModel } from '../types/models';

const makeImage = (file: File | undefined): ImageModel => ({
    meta: { id: 1, isChanged: false, isNew: false },
    file,
    url: '',
    errors: { hasError: false, file: null },
});

describe('image utils', () => {
    it('detects when at least one image has a file', () => {
        const images = [makeImage(undefined), makeImage(new File(['a'], 'a.jpg'))];
        expect(anyImage(images)).toBe(true);
    });

    it('counts only images that have a file', () => {
        const images = [
            makeImage(undefined),
            makeImage(new File(['a'], 'a.jpg')),
            makeImage(new File(['b'], 'b.jpg')),
        ];
        expect(countImages(images)).toBe(2);
    });
});
