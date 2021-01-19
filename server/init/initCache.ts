import Cache from 'node-cache';

export default new Cache({
  stdTTL: 30, // Keep cached elements for 30s by default
});
