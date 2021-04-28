import { Environment } from '@/config'

if (process.env.NODE_ENV === Environment.PRODUCTION && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        // eslint-disable-next-line no-console
        console.log('Service Worker  registered: ', registration)
      })
      .catch((registrationError) => {
        // eslint-disable-next-line no-console
        console.log('Service Worker  registration failed: ', registrationError)
      })
  })
} else {
  console.warn('Service Worker disabled in development mode')
}
