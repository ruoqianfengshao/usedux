import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'
import plugin from './plugin'
import store, {
  useStore, connect, PageProvider,
} from './store'

export { useStore, connect, PageProvider }

const defaultOptions = {
  routerConfig: {

  },
  middlewares: [],
  checkLogin: () => true,
  checkAuth: () => true,
}


export default (options = {}) => {
  const opts = { ...defaultOptions, ...options }
  const {
    Router = router, root = document.getElementById('root'), checkAuth, checkLogin,
  } = opts

  // plugin config, once execute at start
  plugin.usePlugin(opts.plugins)

  // i18n config

  // store config, middlewares execute every dispatch
  store.useMiddleware(opts.middlewares)
  store.initStore(window._USDUX_STORE_)
  store.initContext()

  // router config, and render page after error, 404, 403, 401 validate
  ReactDOM.hydrate(<Router routerConfig={opts.routerConfig} checkAuth={checkAuth} checkLogin={checkLogin} />, root)
}
