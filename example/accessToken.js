const https = require('https')
const { OAuth1Utils } = require('../lib/index')

const consumerKey = ''
const consumerSecret = ''

const httpMethod = 'POST'
const oauthTokenSecret = ''
const oauthToken = ''
const oauthVerifier = ''
const requestUrl = 'https://api.twitter.com/oauth/access_token'
const authorizationHeader = OAuth1Utils.generateAuthorizationHeader({
  consumerKey,
  consumerSecret,
  httpMethod,
  requestUrl,
  oauthTokenSecret,
  oauthToken,
  oauthVerifier
})

const url = new URL(requestUrl)
const request = https.request({
  hostname: url.hostname,
  port: 443,
  path: url.pathname,
  method: httpMethod,
  headers: {
    Authorization: authorizationHeader
  }
}, (res) => {
  const data = []
  res.on('data', chunk => data.push(chunk))
  res.on('end', () => console.log(Buffer.concat(data).toString()))
  // => oauth_token=xxxxx-xxxxxxx&oauth_token_secret=xxx&user_id=000&screen_name=xxx
})
request.end()
