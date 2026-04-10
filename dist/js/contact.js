// Tabs and panel containers
const contactTabs = document.querySelectorAll('.contact__tab')
const contactPanels = document.querySelectorAll('.contact__panel')

// Step containers (services and classes use separate step groups)
const serviceSteps = document.querySelectorAll('[data-service-step]')
const classSteps = document.querySelectorAll('[data-class-step]')

// Switch visible step in "services" flow.
// Only the active step remains enabled so hidden inputs are not focusable/submittable.
const setServiceStep = (step) => {
  if (!serviceSteps.length) return

  serviceSteps.forEach((serviceStep) => {
    const isActive = serviceStep.dataset.serviceStep === String(step)
    serviceStep.hidden = !isActive
  })
}

// Switch visible step in "classes" flow.
const setClassStep = (step) => {
  if (!classSteps.length) return

  classSteps.forEach((classStep) => {
    const isActive = classStep.dataset.classStep === String(step)
    classStep.hidden = !isActive
  })
}

// Apply active/inactive state to a panel and its inputs.
const setPanelState = (panel, isActive) => {
  panel.hidden = !isActive

  // Reset each flow to step 1 when its panel becomes active.
  if (panel.dataset.panel === 'services' && isActive) {
    setServiceStep(1)
  }
  if (panel.dataset.panel === 'classes' && isActive) {
    setClassStep(1)
  }
}

const currentTab = 'services'
contactPanels.forEach((panel) => {
  setPanelState(panel, panel.dataset.panel === currentTab)
})

// Clicking a tab updates both tab button state and panel visibility.
contactTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab

    contactTabs.forEach((currentTab) => {
      const isActive = currentTab === tab
      currentTab.classList.toggle('contact__tab--active', isActive)
    })

    contactPanels.forEach((panel) => {
      setPanelState(panel, panel.dataset.panel === target)
    })
  })
})

// Buttons and result placeholders
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

// Render bullet-like list items in summary area.
// Displays "- None" when nothing is selected so the section is never empty.
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

// Collect service-form values and reflect them into summary/result placeholders.
const updateServiceResult = () => {
  const nameValue = document.getElementById('service-name')?.value?.trim()
  const contactValue = document.querySelector('input[name="service_phone"]')?.value?.trim()

  // Convert checked checkbox values to display labels.
  const bridalServiceValues = [...document.querySelectorAll('input[name="bridal_service[]"]:checked')].map(
    (input) => bridalServiceLabelMap[input.value] || input.value
  )

  const premiumValues = [...document.querySelectorAll('input[name="premium[]"]:checked')].map(
    (input) => premiumLabelMap[input.value] || input.value
  )

  const attendeeValues = [...document.querySelectorAll('input[name^="guest_"]:checked')].map(
    (input) => attendeeLabelMap[input.name] || input.name
  )

  resultName.textContent = nameValue || 'Guest'
  resultContact.textContent = contactValue || 'your contact number'

  renderResultList(resultBasicServices, bridalServiceValues)
  renderResultList(resultPremiumServices, premiumValues)
  renderResultList(resultAttendees, attendeeValues)
}

// Collect class-form values and mirror them to class result blocks.
const updateClassResult = () => {
  const classNameValue = document.getElementById('class-name')?.value?.trim()
  const classContactValue = document.querySelector('input[name="class_phone"]')?.value?.trim()

  classResultName.textContent = classNameValue || 'Guest'
  classResultNameSecond.textContent = classNameValue || 'Guest'
  classResultContact.textContent = classContactValue || '+1-0000000000'
}

// Guest counters (UI-only increment/decrement controls).
// Current count is kept in local state and reflected in the counter text node.
const guestCounters = document.querySelectorAll('[data-guest-counter]')
guestCounters.forEach((counter) => {
  const valueEl = counter.querySelector('[data-counter-value]')
  const decreaseBtn = counter.querySelector('[data-counter-action="decrease"]')
  const increaseBtn = counter.querySelector('[data-counter-action="increase"]')
  let count = Number(valueEl?.textContent || 0)

  const render = () => {
    // Keep minus button disabled at zero to avoid negative counts.
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

// Service flow navigation
serviceNextButton.addEventListener('click', () => setServiceStep(2))
serviceBackButton.addEventListener('click', () => setServiceStep(1))
serviceSubmitButton.addEventListener('click', () => {
  updateServiceResult()
  setServiceStep(3)
})
serviceEditButton.addEventListener('click', () => setServiceStep(2))
classSubmitButton.addEventListener('click', () => {
  updateClassResult()
  setClassStep(2)
})
