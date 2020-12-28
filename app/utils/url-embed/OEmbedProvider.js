import Axios from 'axios';
import URLEmbedProvider from './URLEmbedProvider';

/**
 * Converts a pattern of URLs into markup via an oembed provider
 * @see http://oembed.com
 * @extends {URLEmbedProvider}
 * @interface
 */
class OEmbedProvider extends URLEmbedProvider {
  /**
   * @param {String} providerURL - the URL of the provider's oembed service
   * @param {Array<RegExp>} urlPatterns - array of regular expressions that this provider will match
   * @param {String} format - the data format of the provider's oembed service. Must be either 'json' or 'xml'.
   */
  constructor(providerURL, urlPatterns, format) {
    super(urlPatterns);

    /**
     * The URL of the provider's oembed service
     * @type {String}
     */
    if (providerURL) this.providerURL = providerURL;

    /**
     * @desc The data format of the provider's oembed service.
     * @type {String}
     */
    if (format) this.format = format;
  }

  /**
   * Resolves options.embedURL to an embed and passes it to callback.
   * @param {Embed} embed - Embed object
   * @param {function(embed:Embed)} callback - callback to invoke after resolving embed
   * @throws {UnexpectedStatusError} throws when provider API returns a non-200 response.
   * @override
   */
  getEmbed(url) {
    let requestOptions = this.buildRequestOptions();
    let oembedAPIURL = this.buildAPIURL();
    requestOptions.params = {
      url,
      format: this.format,
    };
    return Axios.get(oembedAPIURL, requestOptions);
  }

  /**
   * Builds the API URL string
   * @param {Embed} embed - Embed object
   * @return {String} - API URL
   */
  buildAPIURL() {
    return `${this.providerURL}`;
  }

  /**
   * Builds the HTTP request options (headers, etc.)
   * @see https://www.npmjs.com/package/request
   * @param {Embed} embed - Embed object
   * @return {Object} - request options
   */
  buildRequestOptions() {
    let requestOptions = {
      timeout: this.timeoutMs,
    };
    return requestOptions;
  }

  /**
   * Configures the provider
   * @param {Object} configOptions
   * @param {number} configOptions.timeoutMs - Request timeout in milliseconds.
   * @override
   */
  configure(configOptions) {
    if (configOptions && configOptions.timeoutMs) {
      this.timeoutMs = configOptions.timeoutMs;
    }
  }
}

/**
 * The data format of the provider's oembed service. Defaults to 'json'
 * @identifier format
 * @type {String}
 */
OEmbedProvider.prototype.format = 'json';

/**
 * Default request timeout in milliseconds. Defaults to 2000.
 * @type {number}
 * @identifier timeoutMs
 */
OEmbedProvider.prototype.timeoutMs = 2000;

export default OEmbedProvider;
