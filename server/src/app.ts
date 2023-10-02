import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Routes } from './interfaces';
import errorMiddleware from './middlewares/error.middleware';
import passport from "passport";
import { jwtStrategy } from "./config/passport";
import { connectDb } from "./config/db"

class App {
  static app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    App.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    try {
      App.app.listen(this.port, async () => {
        console.log(`Server is running on port ${this.port}`);
        await connectDb();
      });
    } catch (error) {
      console.log(error);
    }
  }

  public getServer() {
    return App.app;
  }

  private initializeMiddlewares() {
    App.app.use(morgan('dev'));
    App.app.use(passport.initialize());
    passport.use("jwt", jwtStrategy);
    App.app.use(cors({ origin: '*' }));
    App.app.use(helmet());
    App.app.use(express.json());
    App.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      App.app.use('/api', route.router);
    });
  }

  private initializeErrorHandling() {
    App.app.use(errorMiddleware);
  }
}

export default App;
