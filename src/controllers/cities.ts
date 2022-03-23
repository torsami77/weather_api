import { Request, Response }  from "express";
import axios from 'axios';
import { config } from 'dotenv';
import {
    cityList, status, messages, successResponse, errorResponse, calculateDistance, City, GetWeatherDataType, Get_Weather_Request
} from '../utils/index';

config();

export default class Cities_Controller {
    static async get_cities_within_lat_lng (req: Request, res: Response){
        try {

            const latitude = req.query?.lat;
            const longitude = req.query?.lng;
            
            const lat = typeof latitude === 'string'? parseFloat(latitude) : null;
            const lng = typeof longitude === 'string'? parseFloat(longitude) : null;

            if (lat === null || lng === null){
                return errorResponse(res, status.error, messages.error);
            }

            const data: Array<object> = [];
            
            if(typeof lat === 'number' && typeof lng === 'number'){
                cityList.forEach((city) => {
                    if(calculateDistance(city?.coord?.lat, city?.coord?.lon, lat, lng) <= 10){
                        data.push({
                            id: city.id,
                            name: city.name
                        })
                    }
                })
            }

            if (typeof data !== 'undefined' && data.length > 0){
                return successResponse(res, status.success, messages.success, data);
            } else {
                return errorResponse(res, status.notfound, messages.notFound);
            }           
        } catch(error){
            return errorResponse(res, status.error, messages.error);
        }
    }

    static async get_details_by_city_id (req: Request, res: Response){
        try {
            const { city_id } = req.params;

            const result = cityList.find((city) => city.id === parseInt(city_id));

            if(result){
                return successResponse(res, status.success, messages.success, {
                    id: result.id,
                    name: result.name,
                    lat: result.coord.lat,
                    lon: result.coord.lon,
                });
            } else {
                return errorResponse(res, status.notfound, messages.notFound);
            }
        } catch (error) {
            return errorResponse(res, status.error, messages.error);
        }
    }

    static async get_city_weather_data (req: Request, res: Response){
        try {
            const { city_id } = req.params;

            const result = cityList.find((city) => city.id === parseInt(city_id));

            if(!result){
                return errorResponse(res, status.notfound, messages.notFound);
            }
           const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${result?.coord?.lat}&lon=${result?.coord?.lon}&appid=${process?.env?.WEATHER_API_KEY}`;

            const get_weather: Get_Weather_Request = await axios.get(
                weather_url
            );

            if(get_weather && get_weather.data){
                const { data } = get_weather;
                const return_data = {
                    type: data.weather[0].main,
                    type_description: data.weather[0].description,
                    sunrise: new Date(data.sys.sunrise * 1000),
                    sunset: new Date(data.sys.sunset * 1000),
                    temp: data.main.temp,
                    temp_min: data.main.temp_min,
                    temp_max: data.main.temp_max,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    clouds_percent: data.clouds.all,
                    wind_speed: data.wind.speed,
                }
                return successResponse(res, status.success, messages.success, return_data);
            } else {
                return errorResponse(res, status.error, messages.error);
            }
        } catch (error) {
            return errorResponse(res, status.error, messages.error);
        }
    }
}