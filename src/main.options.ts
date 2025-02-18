import { SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';
import { JSON_DOCUMENT_URL } from './main.consts';

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
  autoTagControllers: true,
};

export const swaggerCustomOptions: SwaggerCustomOptions = {
  jsonDocumentUrl: JSON_DOCUMENT_URL,
};
