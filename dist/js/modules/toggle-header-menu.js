export function toggleHeaderMenu() {
  const toggleBtn = document.getElementById('headerToggleBtn')
  const sidebar = document.getElementById('headerSidebar')

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('is-open')

      if (isOpen) {
        sidebar.classList.remove('is-open')
        toggleBtn.classList.remove('is-active')
        document.body.style.overflow = ''
      } else {
        sidebar.classList.add('is-open')
        toggleBtn.classList.add('is-active')
        document.body.style.overflow = 'hidden'
      }
    })
  }
}
