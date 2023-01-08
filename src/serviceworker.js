const version = '1.0.1'

self.addEventListener('install', event => {
  console.log('ServiceWorker: Has installed version', version)
  /**
   * Caches resources required for the app to at all function.
   *
   * @returns {Promise} Promise that resolves to undefined.
   */
  const cacheResources = async () => {
    const cache = await self.caches.open(version)
    console.log('ServiceWorker: Is caching files.')

    return cache.addAll([
      'index.html',
      'favicon.ico',
      '/css/styles.css',
      'js/index.js',
      'js/components/jk224jv-wm/index.js',
      'js/components/jk224jv-wm/jk224jv-wm.js',
      'js/components/jk224jv-wm/css/style.css',
      'js/components/jk224jv-wm/components/jk224jv-dock/index.js',
      'js/components/jk224jv-wm/components/jk224jv-dock/jk224jv-dock.js',
      'js/components/jk224jv-wm/components/jk224jv-dock/css/style.css',
      'js/components/jk224jv-wm/components/jk224jv-window/index.js',
      'js/components/jk224jv-wm/components/jk224jv-window/jk224jv-window.js',
      'js/components/jk224jv-wm/components/jk224jv-window/css/style.css'

    ])
  }
  event.waitUntil(cacheResources())
})

self.addEventListener('active', event => {
  console.log('ServiceWorker: Has activated version ', version)
  // clean up old version of the cache
})

self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Is fetching somthing')
  // cache new resources when online and serve cached content if offline.
})

self.addEventListener('message', event => {
  console.log('ServiceWorker: Got a message')
  // Handle events from the main application
})

self.addEventListener('push', event => {
  console.log('ServiceWorker: Got a push message from the server')
  // Show a notification for the user
})

// terminated

// error
