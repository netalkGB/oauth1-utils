const https = require('https')
const { OAuth1Utils } = require('../lib/index')

const consumerKey = ''
const consumerSecret = ''

const oauthToken = ''
const oauthTokenSecret = ''

const httpMethod = 'GET'
const requestUrl = 'https://api.twitter.com/1.1/statuses/home_timeline.json'

const params = {
  count: '3'
}

const authorizationHeader = OAuth1Utils.generateAuthorizationHeader({
  consumerKey,
  consumerSecret,
  oauthToken,
  oauthTokenSecret,
  httpMethod,
  requestUrl
}, params)

const url = new URL(`${requestUrl}`)
const request = https.request({
  hostname: url.hostname,
  port: 443,
  path: `${url.pathname}?${OAuth1Utils.objectToRfc3986EncodedKeyValue(params)}`,
  method: httpMethod,
  headers: {
    Authorization: authorizationHeader
  }
}, (res) => {
  const data = []
  res.on('data', chunk => data.push(chunk))
  res.on('end', () => console.log(Buffer.concat(data).toString()))
})
request.end()
