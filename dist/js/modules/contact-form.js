export function contactFormHandler() {
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
}
