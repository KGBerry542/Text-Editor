const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(({ request }) => {
  // Cache CSS, JS, and other static assets
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
    return new CacheFirst({
      cacheName: 'static-assets-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    });
  }

  // Cache images
  if (request.destination === 'image') {
    return new CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 50, // Cache up to 50 images
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        }),
      ],
    });
  }

  // Use default strategy for other requests
  return null;
});

registerRoute();