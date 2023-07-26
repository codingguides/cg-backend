import swaggerUi  from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import { user}  from '.'
export function  swagger (app) {
const swaggerDefinition = {
  info: {
    title: "Codingguides Backend application",
    version: "3.0.0",
    description: "Endpoints to test codingguides backend application",
  },
  host: "localhost:3059",
  basePath: "/api/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "x-auth-token",
      scheme: "bearer",
      in: "header",
    },
  },
};
  
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    apis: ['./json/**/*.yaml'],
  };
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);
  //for multiple file in yaml fromat use above swaggerSpec option insted of user
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(user));

}
