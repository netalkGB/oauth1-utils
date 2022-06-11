// It works with Node.js 18 and above.
const { OAuth1Utils } = require('../lib/index')

const consumerKey = ''
const consumerSecret = ''

const oauthToken = ''
const oauthTokenSecret = ''

main().catch(e => console.error(e))

async function main () {
  const httpMethod = 'GET'
  const requestUrl = 'https://api.twitter.com/1.1/statuses/home_timeline.json'

  const params = {
    count: '2'
  }

  const headers = new Headers()
  const oauthHeader = OAuth1Utils.generateAuthorizationHeader({
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthTokenSecret,
    httpMethod,
    requestUrl
  }, params)
  headers.append('Authorization', oauthHeader)

  const response = await fetch(`${requestUrl}?${OAuth1Utils.objectToRfc3986EncodedKeyValue(params)}`, {
    method: httpMethod,
    headers
  })
  console.log(await response.text())
}
