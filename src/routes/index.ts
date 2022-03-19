import * as express from "express";
import cities from './endpoints/cities'

const router = express.Router();

router.use('/', cities);

export default router;