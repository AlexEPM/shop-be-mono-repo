import {middyfy} from '@libs/lambda';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {ProductsDynamoDbService} from '../../services/products-dynamo-db-service';
import {addRequestToLog, errorResponse, successfulResponse, validateProductStructure} from '../../utils';
import {Product} from '../../domain/typings';
import {uuid} from 'uuidv4';

export const productService = new ProductsDynamoDbService();

export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        addRequestToLog(event);

        const newProduct: Product = JSON.parse(JSON.stringify(event.body));
        const productStructureValidationResult = validateProductStructure(newProduct);

        if (productStructureValidationResult) {
            return errorResponse(new Error(
                `Required field '${productStructureValidationResult}' missing in request data structure!`
            ), 400);
        }

        if (newProduct.id) {
            const existingProduct = await productService.getProductById(newProduct.id);

            if (existingProduct) {
                return errorResponse(new Error(`Product with id '${newProduct.id}' already exists!`), 400);
            }
        } else {
            newProduct.id = uuid();
        }

        const createProductResult = await productService.createProduct(newProduct);

        return successfulResponse(createProductResult);
    } catch (e) {
        console.log(`createProduct() error: ${e.message}`);
        console.log(e);
        return errorResponse(e);
    }
};

export const main = middyfy(createProduct);
