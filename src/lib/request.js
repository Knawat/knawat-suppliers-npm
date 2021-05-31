import fetch from 'node-fetch';
import qs from 'qs';
import config from './config';
import Bottleneck from 'bottleneck';

const rateLimitOptions = {
  // SP Default Rate Limit
  reservoir: 30,
  reservoirRefreshInterval: 60 * 1000,
  reservoirRefreshAmount: 30,
};
rateLimitOptions.timeout = rateLimitOptions.reservoirRefreshInterval * 3;
const group = new Bottleneck.Group(rateLimitOptions);

/**
 * A Class Library for handling Knawat MarketPlace related Operations.
 *
 * @class Request
 */
class Request {
  static baseUrl = config.SUPPLIERS_API_URL;
  headers = config.HEADERS;

  constructor(authType, credentials) {
    this.authentication = credentials && credentials.auth
      ? credentials.auth
      : authType; // check for Bearer credentials
    // check for Bearer credentials
    if (this.authentication === 'Bearer' || this.authentication === 'BearerFulfillment') {
      if (
        !credentials ||
        ((!credentials.key || !credentials.secret) && !credentials.token)
      ) {
        throw new Error('Not a valid consumerKey, consumerSecret, or token');
      }
      this.consumerKey = credentials.key;
      this.consumerSecret = credentials.secret;
      this.token = credentials.token;

      const { apiRateLimit } = credentials;
      group.updateSettings(apiRateLimit);
      this.$fetch = group
        .key(credentials.key || credentials.token)
        .wrap(this.$fetch);
    }

    // check for Basic credentials
    if (this.authentication === 'Basic') {
      if (
        (!config.BASIC_USER || !config.BASIC_PASS) &&
        (!credentials.user || !credentials.pass)
      ) {
        throw new Error('No valid Username or Password');
      }
      this.user = config.BASIC_USER || credentials.user;
      this.pass = config.BASIC_PASS || credentials.pass;
    }
  }

  async setAuthHeaders(auth) {
    if (auth === 'Basic') {
      const AUTH = Buffer.from(`${this.user}:${this.pass}`).toString('base64');
      this.headers.authorization = `Basic ${AUTH}`;
      return;
    }
    if (auth === 'Bearer') {
      const supplierToken = await this.getTokenAuth('supplier');
      this.headers.authorization = `Bearer ${supplierToken}`;
      return;
    }
    if (auth === 'BearerFulfillment') {
      const fulfillmentToken = await this.getTokenAuth('fulfillment');
      this.headers.authorization = `Bearer ${fulfillmentToken}`;
      return;
    }
    if (!auth || auth === 'none') {
      delete this.headers.authorization;
    }
  }

  /**
   * Generate access token from store key and secret
   *
   * @readonly
   * @memberof Products
   */
  async getTokenAuth(type = 'supplier') {
    // Await in case of rejection
    await this.token;
    if (!this.token) {
      return this.refreshToken(type);
    }
    return this.token;
  }

  /**
   * Generates a new access token
   *
   * @returns
   * @memberof Products
   */
  refreshToken(type) {
    const endpoint =
      {
        supplier: '/token',
        fulfillment: '/fulfillment/token',
      }[type] || '/token';
    this.token = this.$fetch('POST', endpoint, {
      auth: 'none',
      body: JSON.stringify({
        key: this.consumerKey,
        secret: this.consumerSecret,
      }),
    }).then(({ user: { token } }) => token);
    return this.token;
  }

  /**
   * Fetch data from server
   *
   * @param {string} method
   * @param {string} path
   * @param {object} options
   */
  // Keep unthrottled fetch to use for async routes
  $fetch = this._fetch;
  async _fetch(method, path, options = {}) {
    await this.setAuthHeaders(options.auth || this.authentication);
    let url = `${Request.baseUrl}${path}`;

    if (options.queryParams && Object.keys(options.queryParams).length) {
      // clean empty values
      const sanitizedQuery = Object.entries(options.queryParams).reduce(
        (acc, [key, val]) => {
          // remove null and undefined values only
          if (val === null || val === undefined) {
            return acc;
          }
          acc[key] = val;
          return acc;
        },
        {}
      );

      url += `?${qs.stringify(sanitizedQuery)}`;
      delete options.queryParams;
    }

    let fetchOptions = {
      method,
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    };
    return fetch(url, fetchOptions)
      .then(res => res.json())
      .catch(error => {
        throw error;
      });
  }
}

module.exports = Request;
