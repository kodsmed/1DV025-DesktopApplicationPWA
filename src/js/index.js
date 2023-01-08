/**
 * The main script file of the application.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */
import './components/jk224jv-wm/'

// serviceworker register
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function () {
    try {
      const registration = await this.navigator.serviceWorker.register('./serviceworker.js')

      console.log('ServiceWorker: Registration successful with scope: ', registration.scope)
    } catch (error) {
      console.log('ServiceWorker: Registration failed: ', error)
    }
  })
}
