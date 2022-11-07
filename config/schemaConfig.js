//json validator
var Validator = require("jsonschema").Validator;
var v = new Validator();

var schemaPoint = {
  id: "/Point",
  type: "array",
  properties: {
    points: { type: "integer" },
    bonus: { type: "integer" },
  },
  required: ["points", "bonus"],
};

var schemaPhone = {
  id: "/Phone",
  type: "object",
  properties: {
    personal: { type: "string" },
    work: { type: "string" },
    ext: { type: "string" },
  },
  required: ["personal", "work", "ext"],
};

var schemaFavorites = {
  id: "/Favorites",
  type: "object",
  properties: {
    artist: { type: "string" },
    food: { type: "string" },
  },
  required: ["artist", "food"],
};

var schema = {
  id: "/employees",
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    phone: { $ref: "/Phone" },
    privileges: { type: "string" },
    favorites: { $ref: "/Favorites" },
    finished: {
      type: "array",
      items: { type: "integer" },
    },
    badges: {
      type: "array",
      items: { type: "string" },
    },
    points: { $ref: "/Point" },
  },
  required: [
    "name",
    "age",
    "phone",
    "privileges",
    "favorites",
    "finished",
    "badges",
    "points",
  ],
};



v.addSchema(schemaPoint, "/Point");
v.addSchema(schemaPhone, "/Phone");
v.addSchema(schemaFavorites, "/Favorites");

module.exports = { "validator": v , "schema":schema};