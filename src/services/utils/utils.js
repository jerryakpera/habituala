const base64 = require("base-64")
const utf8 = require("utf8")
const moment = require("moment")

function encryptObject(obj) {
  const stringified = JSON.stringify(obj)
  const bytes = utf8.encode(stringified)
  var encoded = base64.encode(bytes)
  return encoded
}

function decryptObject(encodedData) {
  let str = base64.decode(encodedData)
  return JSON.parse(str)
}

const storage = {
  save: (name, item) => {
    localStorage.setItem(name, item)
  },
  get: (name) => {
    return localStorage.getItem(name)
  },
  remove: (name) => {
    localStorage.removeItem(name)
  }
}

const formatDate = (datestring) => {
  console.log(moment(datestring))
}

function getTimeDifference(date) {
  console.log(0, date)
}

module.exports = {
  encryptObject,
  decryptObject,
  storage,
  formatDate,
  getTimeDifference,
}