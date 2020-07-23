const axios = require("axios");
const _ = require("../utils/utils");

let habitualaUserData = "";

if (_.storage.get("habitualaUserData")) {
  habitualaUserData = _.decryptObject(_.storage.get("habitualaUserData"));
}

const graphqlAxios = axios.create({
  baseURL: "https://habituala-api.herokuapp.com/habituala/",
  // baseURL: "http://localhost:3002/api/v1",
  headers: {
    Authorization: habitualaUserData.accessToken
  }
});

module.exports = {
  graphqlAxios
};
