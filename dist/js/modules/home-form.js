// Home Talk section — tab switch for contact form
export function homeForm() {
  const homeTalkForm = document.getElementById('home-contact-form')
  if (!homeTalkForm) return

  const tabs = homeTalkForm.querySelectorAll('.home-contact__tab')
  const panels = homeTalkForm.querySelectorAll('.home-contact__panel')

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab

      tabs.forEach((t) => {
        const isActive = t === tab
        t.classList.toggle('home-contact__tab--active', isActive)
      })

      panels.forEach((panel) => {
        const isActive = panel.dataset.panel === target
        panel.hidden = !isActive
      })
    })
  })
}
