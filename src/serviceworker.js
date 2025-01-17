const version = '1.1.2'
let offlineMode = false

self.addEventListener('install', event => {
  console.log('ServiceWorker: Has installed version', version)
  event.waitUntil(cacheResources())
})

self.addEventListener('activate', event => {
  console.log('ServiceWorker: Has activated version ', version)
  // clean up old version of the cache
  event.waitUntil(removeCachedResources())
})

self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Is fetching somtheing')
  event.respondWith(fetcher(event.request))

  // cache new resources when online and serve cached content if offline.
})

self.addEventListener('message', event => {
  console.log('ServiceWorker: Got a message:', event.data)
  messageHandler(event)
})

self.addEventListener('push', event => {
  console.log('ServiceWorker: Got a push message from the server')
  // Show a notification for the user
})

/**
 * Handles specialcases of Messages.
 *
 * @param {event} event - message event.
 */
function messageHandler (event) {
  if (event.data === 'OnlineDetected') {
    offlineMode = false
  }
  if (event.data === 'OfflineDetected') {
    offlineMode = true
  }
}

/**
 * Splits request depending on if offlineMode is established or not.
 *
 *
 * @param {event.request} request - what does the browser try to fetch?
 * @returns {Promise} Promise that resolves to undefined.
 */
async function fetcher (request) {
  if (!offlineMode) {
    console.log('ServiceWorker: using fetch.')
    const response = await cachedFetch(request)
    return response
  } else {
    console.log('ServiceWorker: using cache.')
    await caches.open(version)
    return caches.match(request)
  }
}

/**
 * Caches resources required for the app to at all function.
 *
 * @returns {Promise} Promise that resolves to undefined.
 */
async function cacheResources () {
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
    'js/components/jk224jv-wm/components/jk224jv-dock/img/online.ico',
    'js/components/jk224jv-wm/components/jk224jv-dock/img/offline.ico',
    'js/components/jk224jv-wm/components/jk224jv-header/index.js',
    'js/components/jk224jv-wm/components/jk224jv-header/jk224jv-header.js',
    'js/components/jk224jv-wm/components/jk224jv-header/css/style.css',
    'js/components/jk224jv-wm/components/jk224jv-window/index.js',
    'js/components/jk224jv-wm/components/jk224jv-window/jk224jv-window.js',
    'js/components/jk224jv-wm/components/jk224jv-window/css/style.css'

  ])
}

/**
 * Trying to do any fetch requested by the browser.
 * If successfull cache the request, If unsuccessfull return cache if available.
 *
 * @param {event.request} request - what does the browser try to fetch?
 * @returns {Promise} Promise that resolves to undefined.
 */
async function cachedFetch (request) {
  try {
    const response = await fetch(request)

    // save to cache
    const cache = await caches.open(version)
    cache.put(request, response.clone())

    // no errors ? then >
    return response
  } catch (error) {
    console.log('ServiceWorker: Is serving cached result')
    return caches.match(request)
  }
}

/**
 * Removes stored cache belonging to any previous version.
 *
 * @returns {Promise} Promise that resolves to undefined.
 */
async function removeCachedResources () {
  const cacheKeys = await caches.keys()

  return Promise.all(
    cacheKeys.map(cache => {
      if (cache !== version) {
        console.log('ServiceWorker: Is Clearing Cache', cache)
        return caches.delete(cache)
      }
      return undefined
    })
  )
}
