import OEmbedProvider from '../OEmbedProvider';

/**
  Spotify embed provider
  @see https://core.trac.wordpress.org/browser/tags/4.4.2/src/wp-includes/class-oembed.php
*/
class Spotify extends OEmbedProvider {}

Spotify.prototype.name = 'spotify';
Spotify.prototype.providerURL = 'https://embed.spotify.com/oembed/';
// eslint-disable-next-line no-useless-escape, prettier/prettier
Spotify.prototype.urlPatterns = ['^https?://(open|play)\.spotify\.com/.*'];
Spotify.prototype.format = 'json';

export default Spotify;
