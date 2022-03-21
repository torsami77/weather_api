import express, { Application, Request, Response }  from "express";
import { config } from 'dotenv';
import bodyParser from "body-parser";
import router from './routes';

const app: Application = express();
config();

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        statusCode: 200,
        message: 'Welcome to klarna-weather-API',
    })
});

app.use('/api/v1/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App running at http://localhost: 8080`);
});

export default app;