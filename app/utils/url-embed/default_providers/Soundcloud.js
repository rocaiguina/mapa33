import OEmbedProvider from '../OEmbedProvider';

/**
  SoundCloud embed provider
  @see https://core.trac.wordpress.org/browser/tags/4.4.2/src/wp-includes/class-oembed.php
*/
class SoundCloud extends OEmbedProvider {}

SoundCloud.prototype.name = 'soundcloud';
SoundCloud.prototype.providerURL = 'http://soundcloud.com/oembed';
// eslint-disable-next-line no-useless-escape, prettier/prettier
SoundCloud.prototype.urlPatterns = ['^https?://(www\.)?soundcloud\.com/.*'];
SoundCloud.prototype.format = 'json';

export default SoundCloud;
