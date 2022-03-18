import express, { Application, Request, Response }  from "express";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import { status } from '../../utils';

chai.use(chaiHttp);
chai.should();

const entryRoute = '/';

// Base Route Test
describe('Base Route Test ', () => {
  it('should return welcome:  Welcome to klarna-weather-API', (done) => {
    chai.request(server).get(entryRoute).end((error, response) => {
      if (error) throw Error(`Error making test request ${entryRoute}`);
      response.should.have.status(status.success);
      response.body.message.should.equal('Welcome to klarna-weather-API');
      done();
    });
  });
  
  it('should return 404 for a non-found route', (done) => {
    chai.request(server).get('/badRoute').end((error, response) => {
      response.should.have.status(404);
      done();
    });
  });
});