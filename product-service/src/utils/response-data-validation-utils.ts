import {Product} from '../domain/typings';

const requiredProductFields: (keyof Product)[] = ['title', 'price'];

export const validateProductStructure = (productItem: any): string | null => {
    for (let key in requiredProductFields) {
        const field = requiredProductFields[key];

       if (!(field in productItem)) {
           return field;
       }
    }

    return null;
}
