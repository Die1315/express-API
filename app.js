const express = require("express"); //import express from 'express' en react
var logger = require("morgan");

const createError = require('http-errors');

const validator = require('./config/schemaConfig');

//read file
//const fs = require("fs");
//let employees = fs.readFileSync("employees.json");
let employees = require("./employees.json")
//express
const app = express();

app.use(logger());
app.use(express.json());

app.listen(8000, () => {
  console.log(`Server is running at PORT: 8000` );
});

app.get("/api/employees/", (req, res) => {
  
  if (req.query.page) {
    let page = Number(req.query.page);
    //console.log(page === 4)
    res.json(employees.slice(2 * (page - 1), 2 * (page - 1) + 2));
  } else if (req.query.user == "true") {
    res.json(employees.filter((element) => element.privileges === "user"));
  } else if (req.query.badges){
    console.log(req.query.badges)
    res.json(employees.filter((e) => e.badges.includes(req.query.badges)))
  }  else{
    //console.log(JSON.parse(employees));
    res.json(employees);
  }
});
app.get("/api/employees/oldest", (req, res) => {
  
  //let ages = [];
  // employees.forEach((element) => {
  //     ages.push(Number(element.age))
  //     console.log(element.age)
  // })
  let ages = employees.map((element) => {
    return Number(element.age);
  });
  const max = Math.max.apply(Math, ages);
  //console.log(ages)
  // console.log(max)
  res.json(employees.filter((e) => max === e.age));
});
app.post("/api/employees", (req, res, next) => {
  let isValid = validator.validator.validate(req.body, validator.schema);
  if(isValid.valid){
   
    employees.push(req.body)
    
    res.json({message: "agregado"});
  } else{
    res.status(400).json({"messsage":"bad_request" })
  }
  console.log(isValid.valid);
  console.log(isValid.errors);
  console.log(req.body);
  
});
app.get("/api/employees/:NAME", (req, res) => {
  
  const resFilter = employees.filter((e) => req.params.NAME === e.name )
  console.log(req.params.NAME)
  console.log(Object.entries(resFilter).length === 0)
  if (Object.entries(resFilter).length === 0){
    res.status(404).json({"message" : "NOT_FOUND" });  
  } else{
    res.json(resFilter)
  }
    
});

module.exports.app = app