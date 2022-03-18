import express, { Application, Request, Response }  from "express";
import bodyParser from "body-parser";
//import router from './routes';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        statusCode: 200,
        message: 'Welcome to klarna-weather-API',
    })
});

//app.use('/api/v1/', router);

app.listen(8080, () => {
    console.log(`App running at http://localhost: 8080`);
});

export default app;