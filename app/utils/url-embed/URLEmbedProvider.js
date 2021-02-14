/**
 * Converts a pattern of URLs into markup
 * @interface
 */
class URLEmbedProvider {
  /**
   * @param {Array<RegExp>} urlPatterns - array of regular expressions that this provider will match
   */
  constructor(urlPatterns) {
    /**
     * Array of regular expressions that this provider will match
     * @type {Array<RegExp>}
     */
    if (urlPatterns) this.urlPatterns = urlPatterns;
  }

  /**
   * Determines if a given URL matches this provider
   * @param {String} embedURL - URL to embed
   * @return {boolean}
   */
  isMatch(embedURL) {
    let matches = false;
    for (let idx = 0; idx < this.urlPatterns.length; idx++) {
      if (embedURL.match(this.urlPatterns[idx])) {
        matches = true;
        idx = this.urlPatterns.length;
      }
    }
    return matches;
  }

  /**
   * Resolves options.embedURL to an embed and passes it to callback.
   * @param {Embed} embed - Embed object
   * @param {function(error: Error, data: Object)} callback - callback to invoke after resolving embed
   */
  getEmbed(embed, callback) {
    try {
      callback(null, embed);
    } catch (error) {
      callback(error);
    }
  }

  /**
   * Stub method caled by EmbedEngine. Can be overridden.
   * @param {Object} engineOptions
   */
  configure(engineOptions) {
    console.log(engineOptions);
  }
}

export default URLEmbedProvider;
