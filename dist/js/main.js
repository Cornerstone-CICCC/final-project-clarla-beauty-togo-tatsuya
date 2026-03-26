import { contactFormHandler } from './modules/contact-form.js'
import { toggleHeaderMenu } from './modules/toggle-header-menu.js'

function init() {
  toggleHeaderMenu()
  contactFormHandler()
}

init()
