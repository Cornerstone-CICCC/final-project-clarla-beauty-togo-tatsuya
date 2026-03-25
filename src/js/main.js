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
