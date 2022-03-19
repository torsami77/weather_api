import express from 'express';
import Cities_Controller from '../../controllers/cities';
import middleware from '../../middlewares';
const { validate } = middleware;

const {
  get_cities_within_lat_lng, get_city_id, city_weather_data
} = Cities_Controller;

const router = express.Router();

router.get('/cities/:city_id/weather', validate('city_id'), city_weather_data);
router.get('/cities/:city_id', validate('city_id'), get_city_id);
router.get('/cities', validate('cities_within_lat_lng'), get_cities_within_lat_lng);

export default router;