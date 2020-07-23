const axios = require("axios")

const authAxios = axios.create({
  baseURL: 'https://habituala-api.herokuapp.com/habituala/auth',
  // baseURL: 'http://localhost:3002/api/v1/auth',
})

module.exports = authAxios
