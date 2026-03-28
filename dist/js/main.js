// Beauty Tips: category filters
const beautyTipsRoot = document.querySelector('.beauty-tips')

if (beautyTipsRoot) {
  const filterButtons = beautyTipsRoot.querySelectorAll('.beauty-tips__filter')
  const cards = beautyTipsRoot.querySelectorAll('.beauty-tips__card')

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all'

      filterButtons.forEach((b) => {
        const on = b === btn
        b.classList.toggle('is-active', on)
        b.setAttribute('aria-selected', on ? 'true' : 'false')
      })

      cards.forEach((card) => {
        if (filter === 'all') {
          card.classList.remove('is-hidden')
          return
        }
        const tags = (card.getAttribute('data-tags') || '').split(/\s+/)
        card.classList.toggle('is-hidden', !tags.includes(filter))
      })
    })
  })
}

// My Work: Makeup / Hairstyle tabs
const myWorkRoot = document.querySelector('.my-work')

if (myWorkRoot) {
  const tabs = myWorkRoot.querySelectorAll('.my-work__tab')
  const panels = myWorkRoot.querySelectorAll('.my-work__panel')

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const name = tab.getAttribute('data-tab')

      tabs.forEach((t) => {
        const isOn = t === tab
        t.classList.toggle('is-active', isOn)
        t.setAttribute('aria-selected', isOn ? 'true' : 'false')
      })

      panels.forEach((panel) => {
        const match = panel.getAttribute('data-panel') === name
        panel.classList.toggle('is-active', match)
        panel.hidden = !match
      })
    })
  })
}

// Hamburger menu toggle
const hamburger = document.querySelector('.header__hamburger')
const nav = document.querySelector('.header__nav')

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('is-open')
    hamburger.classList.toggle('is-active')
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