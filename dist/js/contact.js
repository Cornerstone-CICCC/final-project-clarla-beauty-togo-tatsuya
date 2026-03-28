// Contact form tabs
const contactTabs = document.querySelectorAll('.contact__tab')
const contactPanels = document.querySelectorAll('.contact__panel')
const serviceSteps = document.querySelectorAll('[data-service-step]')
const classSteps = document.querySelectorAll('[data-class-step]')

const setServiceStep = (step) => {
  if (!serviceSteps.length) return

  serviceSteps.forEach((serviceStep) => {
    const isActive = serviceStep.dataset.serviceStep === String(step)
    serviceStep.classList.toggle('contact__step--active', isActive)
    serviceStep.hidden = !isActive

    serviceStep.querySelectorAll('input, select, textarea, button').forEach((field) => {
      if (
        field.hasAttribute('data-service-back') ||
        field.hasAttribute('data-service-next') ||
        field.hasAttribute('data-service-submit') ||
        field.hasAttribute('data-service-edit')
      ) {
        return
      }
      field.disabled = !isActive
    })
  })
}

const setClassStep = (step) => {
  if (!classSteps.length) return

  classSteps.forEach((classStep) => {
    const isActive = classStep.dataset.classStep === String(step)
    classStep.classList.toggle('contact__step--active', isActive)
    classStep.hidden = !isActive

    classStep.querySelectorAll('input, select, textarea, button').forEach((field) => {
      if (field.hasAttribute('data-class-submit')) return
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

    if (panel.dataset.panel === 'classes' && isActive) {
      setClassStep(1)
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
const serviceSubmitButton = document.querySelector('[data-service-submit]')
const serviceEditButton = document.querySelector('[data-service-edit]')
const classSubmitButton = document.querySelector('[data-class-submit]')
const classResultName = document.querySelector('[data-class-result-name]')
const classResultNameSecond = document.querySelector('[data-class-result-name-second]')
const classResultContact = document.querySelector('[data-class-result-contact]')
const resultName = document.querySelector('[data-result-name]')
const resultContact = document.querySelector('[data-result-contact]')
const resultBasicServices = document.querySelector('[data-result-basic-services]')
const resultPremiumServices = document.querySelector('[data-result-premium-services]')
const resultAttendees = document.querySelector('[data-result-attendees]')

const bridalServiceLabelMap = {
  makeup: 'Makeup',
  hairstyle: 'Hairstyle'
}

const premiumLabelMap = {
  'deep-skin-cleansing': 'Deep skin cleansing',
  'bleach-body-hair': 'Bleach body hair',
  hydromassage: 'Hydromassage',
  'hair-moisture': 'Hair Moisture',
  waxing: 'Waxing',
  'foot-and-hand-spa': 'Foot and hand SPA',
  'relaxing-massage': 'Relaxing massage',
  gommage: 'Gommage (body exfoliation and hydration)'
}

const attendeeLabelMap = {
  guest_groom_makeup: 'Groom (Makeup)',
  guest_bridesmaid_hair: 'Bridesmaid (Hairstyle)',
  guest_bridesmaid_makeup: 'Bridesmaid (Makeup)',
  guest_flower_hair: 'Flower girl (Hairstyle)',
  guest_flower_makeup: 'Flower girl (Makeup)'
}

const renderResultList = (targetList, items) => {
  if (!targetList) return
  targetList.innerHTML = ''

  if (!items.length) {
    const empty = document.createElement('li')
    empty.textContent = '- None'
    targetList.appendChild(empty)
    return
  }

  items.forEach((item) => {
    const li = document.createElement('li')
    li.textContent = `- ${item}`
    targetList.appendChild(li)
  })
}

const updateServiceResult = () => {
  const nameValue = document.getElementById('service-name')?.value?.trim()
  const contactValue = document.querySelector('input[name="service_phone"]')?.value?.trim()
  const bridalServiceValue = document.querySelector('input[name="bridal_service"]:checked')?.value

  const premiumValues = [...document.querySelectorAll('input[name="premium[]"]:checked')].map(
    (input) => premiumLabelMap[input.value] || input.value
  )

  const attendeeValues = [...document.querySelectorAll('input[name^="guest_"]:checked')].map(
    (input) => attendeeLabelMap[input.name] || input.name
  )

  if (resultName) {
    resultName.textContent = nameValue || 'Guest'
  }

  if (resultContact) {
    resultContact.textContent = contactValue || 'your contact number'
  }

  renderResultList(
    resultBasicServices,
    bridalServiceValue ? [bridalServiceLabelMap[bridalServiceValue] || bridalServiceValue] : []
  )
  renderResultList(resultPremiumServices, premiumValues)
  renderResultList(resultAttendees, attendeeValues)
}

const updateClassResult = () => {
  const classNameValue = document.getElementById('class-name')?.value?.trim()
  const classContactValue = document.querySelector('input[name="class_phone"]')?.value?.trim()

  if (classResultName) classResultName.textContent = classNameValue || 'Guest'
  if (classResultNameSecond) classResultNameSecond.textContent = classNameValue || 'Guest'
  if (classResultContact) classResultContact.textContent = classContactValue || '+1-0000000000'
}

const guestCounters = document.querySelectorAll('[data-guest-counter]')

guestCounters.forEach((counter) => {
  const valueEl = counter.querySelector('[data-counter-value]')
  const decreaseBtn = counter.querySelector('[data-counter-action="decrease"]')
  const increaseBtn = counter.querySelector('[data-counter-action="increase"]')
  let count = Number(valueEl?.textContent || 0)

  const render = () => {
    if (valueEl) valueEl.textContent = String(count)
    if (decreaseBtn) decreaseBtn.disabled = count === 0
  }

  decreaseBtn?.addEventListener('click', () => {
    count = Math.max(0, count - 1)
    render()
  })

  increaseBtn?.addEventListener('click', () => {
    count += 1
    render()
  })

  render()
})

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

if (serviceSubmitButton) {
  serviceSubmitButton.addEventListener('click', () => {
    updateServiceResult()
    setServiceStep(3)
  })
}

if (serviceEditButton) {
  serviceEditButton.addEventListener('click', () => {
    setServiceStep(2)
  })
}

if (classSubmitButton) {
  classSubmitButton.addEventListener('click', () => {
    updateClassResult()
    setClassStep(2)
  })
}

// Contact form handling
const contactFormEl = document.getElementById('contact-form')

if (contactFormEl) {
  contactFormEl.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(contactFormEl)
    const data = Object.fromEntries(formData)

    console.log('Form submitted:', data)
    alert('Thank you for your message!')

    contactFormEl.reset()
  })
}
