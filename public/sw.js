// Service Worker for PWA - Offline Support & Caching

const CACHE_NAME = 'swadika-v1';
const RUNTIME_CACHE = 'swadika-runtime';

// Assets to cache on install
const PRECACHE_URLS = [
  '/',
  '/menu',
  '/cart',
  '/orders',
  '/offline',
  '/manifest.json',
  '/logo.jpeg'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip API calls for real-time data
  if (event.request.url.includes('/api/orders') || 
      event.request.url.includes('/api/cart')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME_CACHE)
          .then(cache => {
            return fetch(event.request)
              .then(response => {
                // Cache successful responses
                if (response.status === 200) {
                  cache.put(event.request, response.clone());
                }
                return response;
              })
              .catch(() => {
                // Return offline page if network fails
                if (event.request.mode === 'navigate') {
                  return caches.match('/offline');
                }
              });
          });
      })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'Your order update is here!',
    icon: '/logo.jpeg',
    badge: '/logo.jpeg',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/orders'
    },
    actions: [
      { action: 'view', title: 'View Order' },
      { action: 'close', title: 'Close' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Swadika Update', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Background sync for offline orders
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
});

async function syncOrders() {
  // Sync pending orders when back online
  const cache = await caches.open('swadika-pending-orders');
  const requests = await cache.keys();
  
  return Promise.all(
    requests.map(request => 
      fetch(request)
        .then(() => cache.delete(request))
        .catch(err => console.error('Sync failed:', err))
    )
  );
}
