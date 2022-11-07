const request = require('supertest');
const assert = require('assert');
const app = require("./app")
let employees = require("./employees.json")
const validator = require('./config/schemaConfig');


request('http://localhost:8000/api')
  .get('/employees')
  .then((response) => {
    // Check the response type and length
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(1)

    // Check the response data

})
  // .end(function(err, res) {
  //       if (err) throw err;
  //       console.log(res.body);
  // });