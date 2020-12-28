/** @ignore */
import URLEmbedProvider from './URLEmbedProvider';
import OEmbedProvider from './OEmbedProvider';

import YoutubeProvider from './default_providers/Youtube';
import SpotifyProvider from './default_providers/Spotify';
import SoundcloudProvider from './default_providers/Soundcloud';

/**
 * Resolves urls to embeds from a registered list of embed providers
 */
class EmbedEngine {
  /**
   * @param {Object} [engineOptions] - configuration options
   * @param {number} [engineOptions.timeoutMs] - request timeout in milliseconds
   */
  constructor(engineOptions) {
    /**
     * Utility references to provider superclasses
     * @type {{URLEmbedProvider: URLEmbedProvider, OEmbedProvider: OEmbedProvider}}
     */
    this.providerSuperClasses = {
      URLEmbedProvider: URLEmbedProvider,
      OEmbedProvider: OEmbedProvider,
    };

    /**
     * The registry of provider instances
     * @type {Array<URLEmbedProvider>}
     */
    this.providerRegistry = [];

    /**
     * Array of provider classes included in this library
     * @type {Array<URLEmbedProvider>} defaultProviderClasses - array of provider classes included in this library
     */
    this.defaultProviderClasses = [
      YoutubeProvider,
      SpotifyProvider,
      SoundcloudProvider,
    ];

    /**
     * Configuration options. These will also be passed to the configure method of each provider instance
     * @type {Object} engineOptions - configuration options
     * @property {number} engineOptions.timeoutMs - request timeout in milliseconds
     */
    this.engineOptions = engineOptions;

    this._registerDefaultProviders();
  }

  /**
   * Registers a provider instance.
   *
   * __Highlander Rule__: this provider will replace an already registered provider if they have the same name property.
   *
   * @param {URLProvider} provider - instance of <code>URLProvider</code> or <code>OEmbedProvider</code>
   */
  registerProvider(provider) {
    let providerExists = false;

    this._configureProvider(provider);

    for (let idx = 0; idx < this.providerRegistry.length; idx++) {
      if (this.providerRegistry[idx].name === provider.name) {
        this.providerRegistry[idx] = provider;
        providerExists = true;
      }
    }

    if (!providerExists) {
      this.providerRegistry.push(provider);
    }
  }

  _configureProvider(provider) {
    provider.configure(this.engineOptions);
  }

  /**
   * Registers all the default providers in this library
   * @param {String} [path] - directory of provider classes (if not specified it will default to the ones in this library)
   */
  _registerDefaultProviders() {
    for (let i = 0; i < this.defaultProviderClasses.length; i++) {
      let ProviderClass = this.defaultProviderClasses[i];
      let provider = new ProviderClass();
      this._configureProvider(provider);
      this.registerProvider(provider);
    }
  }

  /**
   * Resolves an Embed object, populating its data property and calling the callback
   * @param {Embed} embed - Embed object
   * @param {function(embed: Embed)} callback - callback to invoke after resolving Embed
   */
  getEmbed(url) {
    let providerFound = false;

    for (let idx = 0; idx < this.providerRegistry.length; idx++) {
      let provider = this.providerRegistry[idx];
      if (provider.isMatch(url)) {
        providerFound = provider;
        idx = this.providerRegistry.length;
      }
    }

    if (providerFound) {
      return providerFound.getEmbed(url);
    } else {
      return Promise.reject(`Unknown embed provider for url: ${url}`);
    }
  }
}

export default EmbedEngine;
