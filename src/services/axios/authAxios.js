const axios = require("axios")

const authAxios = axios.create({
  baseURL: 'http://localhost:3002/api/v1/auth',
})

module.exports = authAxios