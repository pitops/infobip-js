const fetch = require('node-fetch')

const BASE_URL = "https://kmxl1.api.infobip.com"

const endpoints = Object.freeze({
  'sms-single': 'sms/1/text/single',
  'sms-multi': 'sms/2/text/single',
  'sms-preview': 'sms/1/preview'
})

function InfobipAPI (auth) {
  _auth = auth || {}
  _options = {}

  _authShape = {
    username: null,
    password: null
  }

  function _checkIfNotEmpty (payload, shape) {
    Object.keys(shape).forEach(key => {
      const optional =
        shape[key] &&
        shape[key].hasOwnProperty('optional') &&
        shape[key].optional
      if (!optional && !payload[key]) {
        throw new Error(`'${key}' is required`)
      }
    })
  }

  function _buildAuthorizationHeader () {
    let buffer = new Buffer.from(_auth.username + ':' + _auth.password)
    return `Basic ${buffer.toString('base64')}`
  }

  function _buildURL (endpoint) {
    return `${BASE_URL}/${endpoints[endpoint]}`
  }

  function _cleanup () {
    _options = {}
  }

  // public members
  this.from = function (from) {
    _options = Object.assign({}, _options, { from })
    return this
  }

  this.to = function (to) {
    _options = Object.assign({}, _options, { to })
    return this
  }

  this.message = function (text) {
    _options = Object.assign({}, _options, { text })
    return this
  }

  this.transliteration = function (language) {
    _options = Object.assign({}, _options, { transliteration: language })
    return this
  }

  this.send = function (endpoint = 'sms-single') {
    _checkIfNotEmpty(_options, {
      from: null,
      to: null,
      text: null,
      transliteration: {
        optional: true
      }
    })
    _checkIfNotEmpty(_auth, _authShape)
    const URL = _buildURL(endpoint)
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: _buildAuthorizationHeader()
    }

    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(_options),
      headers
    }).then(res => {
      _cleanup()
      return res.json()
    })
  }

  this.preview = function () {
    _checkIfNotEmpty(_options, {
      text: null,
      transliteration: {
        optional: true
      }
    })
    _checkIfNotEmpty(_auth, _authShape)
    const URL = _buildURL('sms-preview')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: _buildAuthorizationHeader()
    }

    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(_options),
      headers
    }).then(res => {
      _cleanup()
      return res.json()
    })
  }
}

module.exports = InfobipAPI
