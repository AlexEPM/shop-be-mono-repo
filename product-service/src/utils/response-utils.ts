const DEFAULT_ERROR_MESSAGE = 'Internal server error';

export const successfulResponse = (responseData: any, status?: number) => {
    return {
        statusCode: status || 200,
        body: JSON.stringify(responseData)
    }
}

export const errorResponse = (error: Error, status?: number) => {
    return {
        statusCode: status || 500,
        body: JSON.stringify( { message: error.message || DEFAULT_ERROR_MESSAGE })
    }
}
