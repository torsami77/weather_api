# Klarna-weather_api 
This exercise demonstrates skill proficiency in regards to the following requirement
https://mail.google.com/mail/u/0?ui=2&ik=3047b8dbd6&attid=0.1&permmsgid=msg-f:1727624122377070157&th=17f9c0fc67ae664d&view=att&disp=inline&realattid=2cb2748f3a468188_0.1

## Stacks
- Express
- Node.js
- Typescript
- Docker


## Set up

After cloning this repo ```git clone https://github.com/torsami77/weather_api.git```,  check into the root directory ```cd weather_api```, and run ``` npm install``` to install all the dependencies and devDevpendencies. 
**See sample_dev file for sample of environment variables and keys**
**See dependencies, and "devDependencies" section in package.json file for list of all packages that would be installed**
**Ensure you have Docker installed and runnning before running docker-test**

Use ```npm run docker-test``` to run dockerized test or ```npm run test``` to run test
## Scripts

```npm run dev```   : to run development mode
```npm run build``` : to transpile build. see ./dist folder
```npm start```   : to run production mode
```npm test```   :  to run sample test on sample cases
```npm run docker-test```   :  to run sample test cases in docker container. Ensure you have docker running


## API Documentation
 #### Root Route:  ```/``` 
 ###### Method: GET 
 ###### Sample Success Response  
```
{
    "statusCode":  200,
    "message":  "Welcome to klarna-weather-API",
 }
```
___
#### * Cities around the specified latitude/longitude within a radius of 10 kilometers
  ###### Route: ```/api/v1/cities?lat=34.330502&lng=47.159401```
 ###### Method: GET

 ###### Sample Success Response  
 ```
{
    "statusCode": 200,
    "message": "Request processed successfully",
    "data": [
        {
            "id": 833,
            "name": "Ḩeşār-e Sefīd"
        }
    ]
}
```
___
#### * Retrieve the details for a city (by city_id)
  ###### Route: ```/api/v1/cities/833```
 ###### Method: GET

 ###### Sample Success Response  
 ```
{
    "statusCode": 200,
    "message": "Request processed successfully",
    "data": {
        "id": 833,
        "name": "Ḩeşār-e Sefīd",
        "lat": 34.330502,
        "lon": 47.159401
    }
}
```

___
#### Retrieve the weather data for a city (by city_id) Example
 ###### Route: ```http://localhost:8080/api/v1/cities/833/weather```
 ###### Method: GET
 ###### Sample Success Response  
 ```
{
    "statusCode": 200,
    "message": "Request processed successfully",
    "data": {
        "sunrise": "2022-03-20T02:55:31.000Z",
        "sunset": "2022-03-20T15:02:18.000Z",
        "temp": 279.35,
        "temp_min": 279.35,
        "temp_max": 279.35,
        "pressure": 1017,
        "humidity": 51,
        "clouds_percent": 68,
        "wind_speed": 2.49
    }
}
```
___
## Thank you
