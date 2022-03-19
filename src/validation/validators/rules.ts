import { body, param, query } from 'express-validator';

const usernameRegex = /^[A-Za-z0-9\-']{2,20}$/;
//const toRegex = /^[0-9\-']{6,11}$/;

export const cities_within_lat_lng = [
    query('lat', 'lat is required in params')
        .trim()
        .notEmpty()
        .isNumeric(),
    query('lng', 'lng is required in params')
        .trim()
        .notEmpty()
        .isNumeric()
];

export const city_id = [
    param('city_id', 'invalid "city id" in params')
        .trim()
        .notEmpty()
        .isNumeric()
];

