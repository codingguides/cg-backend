import dotenv from "dotenv"
dotenv.config();
import { Application, EnvConfig } from "./configs";
import { MongoDataSource } from "./datasource";
import {swagger} from './swagger_doc';

function bootstrap() {
  MongoDataSource.connect();

  const app = Application.init();
  const { port } = EnvConfig.server;
  swagger(app)

  app.listen(port || 8080, () => {
    console.info(`server started on --------------------------> ${port}`);
  });

  process.on('SIGINT', () => {
    MongoDataSource.disconnect();
  });
}

bootstrap();

