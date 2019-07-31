const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('GET /apps endpoint', () => {
    it('should generate an array', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array'); 
                expect(res.body).to.have.lengthOf.at.least(1); 
            });
    });

    it('should be 400 if sort is incorrect', () => {
        return request(app)
          .get('/apps')
          .query({sort: 'MISTAKE'})
          .expect(400, 'Sort must be one of rating or app');
    });

    it('should be 400 if genre is incorrect', () => {
        return request(app)
          .get('/apps')
          .query({genre: 'MISTAKE'})
          .expect(400, 'Sort must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
    });

    it('should generate an array with only specified genre', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .query({genre: 'Action'})
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let isGenreOnly = true;
                for(let i = 0; i < res.body.length; i++){
                    if(!res.body[i].Genres.includes('Action')){
                        isGenreOnly = false;
                        break;
                    }
                }
                expect(isGenreOnly).to.be.true;
            });
    });

    it('should generate sorted Array by Rating', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .query({sort: 'Rating'})
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let isSorted = true;
                for(let i = 0; i < res.body.length - 1; i++){
                    if(res.body[i].Rating > res.body[i + 1].Rating){
                        isSorted = false;
                        break;
                    }
                }
                expect(isSorted).to.be.true;
            });
    });

    it('should generate sorted Array by App', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .query({sort: 'App'})
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let isSorted = true;
                for(let i = 0; i < res.body.length - 1; i++){
                    if(res.body[i].App > res.body[i + 1].App){
                        isSorted = false;
                        break;
                    }
                }
            
                expect(isSorted).to.be.true;
            });
    });
})