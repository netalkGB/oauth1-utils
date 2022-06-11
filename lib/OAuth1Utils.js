"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth1Utils = void 0;
var crypto_1 = __importDefault(require("crypto"));
var OAuth1Utils = (function () {
    function OAuth1Utils() {
    }
    OAuth1Utils.generateAuthorizationHeader = function (_a, params) {
        var consumerKey = _a.consumerKey, consumerSecret = _a.consumerSecret, oauthTokenSecret = _a.oauthTokenSecret, oauthToken = _a.oauthToken, oauthCallback = _a.oauthCallback, oauthVerifier = _a.oauthVerifier, httpMethod = _a.httpMethod, requestUrl = _a.requestUrl;
        var query = {
            oauth_version: '1.0',
            oauth_timestamp: this.getTimestamp().toString(),
            oauth_consumer_key: consumerKey,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_nonce: this.generateNonce()
        };
        if (oauthToken) {
            query = __assign(__assign({}, query), { oauth_token: oauthToken });
        }
        if (oauthVerifier) {
            query = __assign(__assign({}, query), { oauth_verifier: oauthVerifier });
        }
        if (oauthCallback) {
            query = __assign(__assign({}, query), { oauth_callback: oauthCallback });
        }
        var signatureBaseString = this.rfc3986Encode(httpMethod.toUpperCase()) +
            '&' + this.rfc3986Encode(requestUrl) +
            '&' + this.rfc3986Encode(this.objectToRfc3986EncodedKeyValue(this.sortByKey(params ? __assign(__assign({}, query), params) : query)));
        var signatureKey = this.rfc3986Encode(consumerSecret) + '&' + (oauthTokenSecret ? this.rfc3986Encode(oauthTokenSecret) : '');
        query = __assign(__assign({}, query), { oauth_signature: this.generateSignature(signatureBaseString, signatureKey) });
        query = this.rfc3986EncodeKeyValue(query);
        return 'OAuth ' + this.generateKeyValueString(query);
    };
    OAuth1Utils.sortByKey = function (obj) {
        var obj2 = {};
        var keys = Object.keys(obj).sort();
        for (var i = 0; i < keys.length; i++) {
            obj2[keys[i]] = obj[keys[i]];
        }
        return obj2;
    };
    OAuth1Utils.generateKeyValueString = function (obj) {
        return Object.keys(obj).map(function (key) { return "".concat(key, "=\"").concat(obj[key], "\""); }).join();
    };
    OAuth1Utils.getTimestamp = function () {
        return Math.floor(new Date().getTime() / 1000);
    };
    OAuth1Utils.generateNonce = function () {
        var nonceLength = 43;
        var alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var nonce = '';
        for (var i = 0; i < nonceLength; i++) {
            nonce += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
        }
        return nonce;
    };
    OAuth1Utils.generateSignature = function (signatureBaseString, signatureKey) {
        var hmac = crypto_1.default.createHmac('sha1', signatureKey);
        hmac.update(signatureBaseString);
        return hmac.digest('base64');
    };
    OAuth1Utils.rfc3986Encode = function (str) {
        return encodeURIComponent(str)
            .replace(/\*/g, '%2A')
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29');
    };
    OAuth1Utils.objectToRfc3986EncodedKeyValue = function (obj) {
        var _this = this;
        return Object.keys(obj).map(function (key) { return "".concat(_this.rfc3986Encode(key), "=").concat(_this.rfc3986Encode(obj[key])); }).join('&');
    };
    OAuth1Utils.rfc3986EncodeKeyValue = function (obj) {
        var keys = Object.keys(obj);
        var obj2 = {};
        for (var i = 0; i < keys.length; i++) {
            obj2[this.rfc3986Encode(keys[i])] = this.rfc3986Encode(obj[keys[i]]);
        }
        return obj2;
    };
    return OAuth1Utils;
}());
exports.OAuth1Utils = OAuth1Utils;
//# sourceMappingURL=OAuth1Utils.js.map