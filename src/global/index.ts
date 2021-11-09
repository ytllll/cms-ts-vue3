import type { App } from 'vue'

import registerElement from './register-element'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  // registerElement(app)
  // registerProperties(app)
  app.use(registerElement)
  app.use(registerProperties)
}
