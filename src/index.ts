import express, { Application, NextFunction, Request, Response }  from "express";
import { config } from 'dotenv';
import bodyParser from "body-parser";
import router from './routes';
import { status } from './utils'

const app: Application = express();
config();

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    res.status(status.success).send({
        statusCode: status.success,
        message: 'Welcome to klarna-weather-API',
    })
});

app.use('/api/v1/', router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error('Not Found');
    err.status = status.notfound;
    next(err);
  });
  

app.use((err: Error & {status: number}, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json({
      errors: {
        message: err.message,
        error: {}
      }
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App running at http://localhost: 8080`);
});

export default app;