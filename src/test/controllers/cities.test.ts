
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '../../index';
import Cities_Controller from '../../controllers/cities';import {
  status, messages
} from '../../utils';

const { get_city_weather_data } = Cities_Controller;
chai.use(sinonChai);
chai.use(chaiHttp);
chai.should();
const { expect } = chai;

const get_cities_within_lat_lng_route ='/api/v1/cities';
const get_details_by_city_id_route = '/api/v1/cities';
const city_weather_data_route = '/api/v1/cities';

afterEach(() => sinon.restore());

const valid_city = {
    id: 833,
    name: "Ḩeşār-e Sefīd",
    state: "",
    country: "IR",
    coord: {
        lon: 47.159401,
        lat: 34.330502,
    },
}

const isIsoDate = (date_string: string) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date_string)) return false;
    const converted_date = new Date(date_string); 
    return converted_date.toISOString() === date_string;
}

describe('List the available cities around the specified latitude/longitude within a radius of 10 kilometers', () => {
    it('Should respond to invalid latitude parameter', (done) => {
        chai.request(server).get(`${get_cities_within_lat_lng_route}?lat=${''}&lng=${valid_city.coord.lon}`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${get_cities_within_lat_lng_route}`);
            response.should.have.status(status.unprocessable);
            response.body.should.have.property('errors');
            response.body.errors.lat.should.equal('lat is required in params');
            done();
        });
    })
    it('Should respond to invalid longitude parameter', (done) => {
        chai.request(server).get(`${get_cities_within_lat_lng_route}?lat=${valid_city.coord.lat}&lng=${''}`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${get_cities_within_lat_lng_route}`);
            response.should.have.status(status.unprocessable);
            response.body.should.have.property('errors');
            response.body.errors.lng.should.equal('lng is required in params');
            done();
        });
    })
    it('Should successfully gets array of cities within 10km of latitude_&_longitude', (done) => {
        chai.request(server).get(`${get_cities_within_lat_lng_route}?lat=${valid_city.coord.lat}&lng=${valid_city.coord.lon}`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${get_cities_within_lat_lng_route}`);
            response.should.have.status(status.success);
            response.body.should.have.property('statusCode').equal(status.success);
            response.body.should.have.property('message').equal('Request processed successfully');
            response.body.data[0].id.should.equal(valid_city.id);
            response.body.data[0].name.should.equal(valid_city.name);
            done();
        });
    })
});

describe('Retrieve the details for a city (by city_id)', () => {
    it('Should response to invalid city id', (done) => {
        chai.request(server).get(`${get_details_by_city_id_route}/${'wrongid'}`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${get_details_by_city_id_route}`);
            response.should.have.status(status.unprocessable);
            response.body.should.have.property('errors');
            response.body.errors.city_id.should.equal('invalid "city id" in params');
            done();
        });
    })
    it('Should response to city id not found', (done) => {
        chai.request(server).get(`${get_details_by_city_id_route}/${123456}`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${get_details_by_city_id_route}`);
            response.should.have.status(status.notfound);
            response.body.should.have.property('statusCode').equal(status.notfound);
            response.body.should.have.property('message').equal('No city found with provided parameter(s)');
            done();
        });
    })
    it('Should successfully get details using city id', (done) => {
        chai.request(server).get(`${get_details_by_city_id_route}/${valid_city.id}`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${get_details_by_city_id_route}`);
            response.should.have.status(status.success);
            response.body.should.have.property('statusCode').equal(status.success);
            response.body.should.have.property('message').equal('Request processed successfully');
            response.body.data.id.should.equal(valid_city.id);
            response.body.data.name.should.equal(valid_city.name);
            response.body.data.lat.should.equal(valid_city.coord.lat);
            response.body.data.lon.should.equal(valid_city.coord.lon);
            done();
        });
    })
});

describe('Retrieve the weather data for a city (by city_id)', () => {
    it('Should response to invalid city id', (done) => {
        chai.request(server).get(`${city_weather_data_route}/${'wrongid'}/weather`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${city_weather_data_route}/${'wrongid'}/weather`);
            response.should.have.status(status.unprocessable);
            response.body.should.have.property('errors');
            response.body.errors.city_id.should.equal('invalid "city id" in params');
            done();
        });
    })
    it('Should response to city id not found', (done) => {
        chai.request(server).get(`${city_weather_data_route}/${123456}/weather`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${city_weather_data_route}/${123456}/weather`);
            response.should.have.status(status.notfound);
            response.body.should.have.property('statusCode').equal(status.notfound);
            response.body.should.have.property('message').equal('No city found with provided parameter(s)');
            done();
        });
    })
    it('fakes server error when getting weather from external resource', async () => {
            const req: any = {
                query: {
                  city_id: valid_city.id,
                }
            };
            const res: any = {
                status: () => {},
                json: () => {},
            };
            sinon.stub(res, 'status').returnsThis();
          
            await get_city_weather_data(req, res);
            res.status.should.have.been.calledWith(status.error);
    })
    it('Should successfully respond with the city weather', function(done){
        this.timeout(20000);
        chai.request(server).get(`${city_weather_data_route}/${valid_city.id}/weather`)
        .end((error, response) => {
            if (error) throw Error(`Error making test request ${city_weather_data_route}/${valid_city.id}/weather`);            
            response.should.have.status(status.success);
            response.body.should.have.property('statusCode').equal(status.success);
            response.body.should.have.property('message').equal('Request processed successfully');
            response.body.data.should.be.a('object');
            response.body.data.type.should.be.a('string');
            response.body.data.type_description.should.be.a('string');
            isIsoDate(response.body.data.sunrise).should.equal(true);
            isIsoDate(response.body.data.sunset).should.equal(true);
            response.body.data.temp.should.be.a('number');
            response.body.data.temp_min.should.be.a('number');
            response.body.data.temp_max.should.be.a('number');
            response.body.data.pressure.should.be.a('number');
            response.body.data.humidity.should.be.a('number');
            response.body.data.clouds_percent.should.be.a('number');
            response.body.data.wind_speed.should.be.a('number');
            done();
        });
    })
});