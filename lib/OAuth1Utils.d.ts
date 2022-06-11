declare type HeaderParams = {
    consumerKey: string;
    consumerSecret: string;
    oauthTokenSecret: string;
    oauthToken?: string;
    oauthCallback?: string;
    oauthVerifier?: string;
    httpMethod: string;
    requestUrl: string;
};
export declare class OAuth1Utils {
    static generateAuthorizationHeader({ consumerKey, consumerSecret, oauthTokenSecret, oauthToken, oauthCallback, oauthVerifier, httpMethod, requestUrl }: HeaderParams, params?: {
        [key: string]: string;
    }): string;
    static sortByKey(obj: {
        [key: string]: string;
    }): {
        [key: string]: string;
    };
    private static generateKeyValueString;
    static getTimestamp(): number;
    static generateNonce(): string;
    static generateSignature(signatureBaseString: string, signatureKey: string): string;
    static rfc3986Encode(str: string): string;
    static objectToRfc3986EncodedKeyValue(obj: {
        [key: string]: string;
    }): string;
    private static rfc3986EncodeKeyValue;
}
export {};
//# sourceMappingURL=OAuth1Utils.d.ts.map