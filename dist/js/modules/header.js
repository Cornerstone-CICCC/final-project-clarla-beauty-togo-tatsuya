export function initHeader() {
  const header = document.getElementById('header')
  if (!header) return

  const SCROLL_THRESHOLD = 300

  function handleScroll() {
    const currentScrollY = window.scrollY

    if (currentScrollY >= SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled')
    } else {
      header.classList.remove('is-scrolled')
    }
  }

  let ticking = false
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  })

  handleScroll()
}
