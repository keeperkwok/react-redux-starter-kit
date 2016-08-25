import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: '<%= realEntityName %>',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './<%= smartPath %>/<%= pascalEntityName %>Container',
      './modules/<%= realEntityName %>'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const <%= pascalEntityName %> = require('./<%= smartPath %>/<%= pascalEntityName %>Container').default
      const reducer = require('./modules/<%= realEntityName %>').default
      const sagas = require('./modules/<%= realEntityName %>').sagas
      /*  Add the reducer to the store on key '<%= realEntityName %>'  */
      injectReducer(store, { key: '<%= realEntityName %>', reducer })
      injectSagas(store, { key: '<%= realEntityName %>', sagas })
      /*  Return getComponent   */
      cb(null, <%= pascalEntityName %>)

    /* Webpack named bundle   */
    }, '<%= realEntityName %>')
  }
})
