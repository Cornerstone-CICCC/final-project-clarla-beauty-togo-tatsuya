// Contact form tabs
const contactTabs = document.querySelectorAll('.contact__tab')
const contactPanels = document.querySelectorAll('.contact__panel')
const serviceSteps = document.querySelectorAll('[data-service-step]')

const setServiceStep = (step) => {
  if (!serviceSteps.length) return

  serviceSteps.forEach((serviceStep) => {
    const isActive = serviceStep.dataset.serviceStep === String(step)
    serviceStep.classList.toggle('contact__step--active', isActive)
    serviceStep.hidden = !isActive

    serviceStep.querySelectorAll('input, select, textarea, button').forEach((field) => {
      if (field.hasAttribute('data-service-back') || field.hasAttribute('data-service-next')) return
      field.disabled = !isActive
    })
  })
}

if (contactTabs.length && contactPanels.length) {
  const setPanelState = (panel, isActive) => {
    panel.classList.toggle('contact__panel--active', isActive)
    panel.hidden = !isActive

    panel.querySelectorAll('input, select, textarea').forEach((field) => {
      field.disabled = !isActive
    })

    if (panel.dataset.panel === 'services' && isActive) {
      setServiceStep(1)
    }
  }

  const currentTab = document.querySelector('.contact__tab--active')?.dataset.tab || 'services'

  contactPanels.forEach((panel) => {
    setPanelState(panel, panel.dataset.panel === currentTab)
  })

  contactTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab

      contactTabs.forEach((currentTab) => {
        const isActive = currentTab === tab
        currentTab.classList.toggle('contact__tab--active', isActive)
        currentTab.setAttribute('aria-selected', String(isActive))
      })

      contactPanels.forEach((panel) => {
        setPanelState(panel, panel.dataset.panel === target)
      })
    })
  })
}

const serviceNextButton = document.querySelector('[data-service-next]')
const serviceBackButton = document.querySelector('[data-service-back]')

if (serviceNextButton) {
  serviceNextButton.addEventListener('click', () => {
    setServiceStep(2)
  })
}

if (serviceBackButton) {
  serviceBackButton.addEventListener('click', () => {
    setServiceStep(1)
  })
}

// Contact form handling
const contactForm = document.getElementById('contact-form')

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    console.log('Form submitted:', data)
    alert('Thank you for your message!')

    contactForm.reset()
  })
}
