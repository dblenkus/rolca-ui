import { ImageModel } from '../types/models';

export const anyImage: (images: ImageModel[]) => boolean = (images) => {
    return images.some((image) => !!image.file);
};
