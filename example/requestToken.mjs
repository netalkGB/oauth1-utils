import https from 'https'
import { OAuth1Utils } from '../lib/exportEsm.mjs'

const consumerKey = ''
const consumerSecret = ''

const httpMethod = 'POST'
const requestUrl = 'https://api.twitter.com/oauth/request_token'

const oauthCallback = 'oob'

const authorizationHeader = OAuth1Utils.generateAuthorizationHeader({ consumerKey, consumerSecret, oauthCallback, httpMethod, requestUrl })

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
  // => oauth_token=xxxxxxx&oauth_token_secret=xxxxxxxx&oauth_callback_confirmed=true
})
request.end()
