import config, { Variable, Environment } from '@/config'

if (config.variables[Variable.SERVICE_WORKER_ENABLED]) {
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
    // eslint-disable-next-line no-console
    console.warn('Service Worker disabled')
  }
}
