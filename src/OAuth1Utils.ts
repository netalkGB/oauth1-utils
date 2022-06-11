import crypto from 'crypto'

type HeaderParams = {
  consumerKey: string,
  consumerSecret: string,
  oauthTokenSecret: string,
  oauthToken?: string,
  oauthCallback?: string,
  oauthVerifier?: string,
  httpMethod: string,
  requestUrl: string
}

export class OAuth1Utils {
  static generateAuthorizationHeader ({ consumerKey, consumerSecret, oauthTokenSecret, oauthToken, oauthCallback, oauthVerifier, httpMethod, requestUrl }: HeaderParams, params?: { [key: string]: string; }): string {
    let query:{ [key: string]: string; } = {
      oauth_version: '1.0',
      oauth_timestamp: this.getTimestamp().toString(),
      oauth_consumer_key: consumerKey,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_nonce: this.generateNonce()
    }
    if (oauthToken) {
      query = {
        ...query,
        oauth_token: oauthToken
      }
    }
    if (oauthVerifier) {
      query = {
        ...query,
        oauth_verifier: oauthVerifier
      }
    }
    if (oauthCallback) {
      query = {
        ...query,
        oauth_callback: oauthCallback
      }
    }
    const signatureBaseString = this.rfc3986Encode(httpMethod.toUpperCase()) +
      '&' + this.rfc3986Encode(requestUrl) +
      '&' + this.rfc3986Encode(this.objectToRfc3986EncodedKeyValue(this.sortByKey(params ? { ...query, ...params } : query)))
    const signatureKey = this.rfc3986Encode(consumerSecret) + '&' + (oauthTokenSecret ? this.rfc3986Encode(oauthTokenSecret) : '')
    query = {
      ...query,
      oauth_signature: this.generateSignature(signatureBaseString, signatureKey)
    }
    query = this.rfc3986EncodeKeyValue(query)
    return 'OAuth ' + this.generateKeyValueString(query)
  }

  static sortByKey (obj: { [key: string]: string; }) {
    const obj2: { [key: string]: string; } = {}
    const keys = Object.keys(obj).sort()
    for (let i = 0; i < keys.length; i++) {
      obj2[keys[i]] = obj[keys[i]]
    }
    return obj2
  }

  private static generateKeyValueString (obj: { [key: string]: string; }): string {
    return Object.keys(obj).map(key => `${key}="${obj[key]}"`).join()
  }

  static getTimestamp (): number {
    return Math.floor(new Date().getTime() / 1000)
  }

  static generateNonce (): string {
    const nonceLength = 43
    const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let nonce = ''
    for (let i = 0; i < nonceLength; i++) {
      nonce += alphanumeric[Math.floor(Math.random() * alphanumeric.length)]
    }
    return nonce
  }

  static generateSignature (signatureBaseString: string, signatureKey: string): string {
    const hmac = crypto.createHmac('sha1', signatureKey)
    hmac.update(signatureBaseString)
    return hmac.digest('base64')
  }

  static rfc3986Encode (str: string): string {
    return encodeURIComponent(str)
      .replace(/\*/g, '%2A')
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
  }

  static objectToRfc3986EncodedKeyValue (obj: { [key: string]: string; }): string {
    return Object.keys(obj).map(key => `${this.rfc3986Encode(key)}=${this.rfc3986Encode(obj[key])}`).join('&')
  }

  private static rfc3986EncodeKeyValue (obj: { [key: string]: string; }): { [key: string]: string; } {
    const keys = Object.keys(obj)
    const obj2: { [key: string]: string; } = {}
    for (let i = 0; i < keys.length; i++) {
      obj2[this.rfc3986Encode(keys[i])] = this.rfc3986Encode(obj[keys[i]])
    }
    return obj2
  }
}
