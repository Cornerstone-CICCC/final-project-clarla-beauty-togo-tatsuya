export function toggleHeaderMenu() {
  const hamburger = document.querySelector('.header__hamburger')
  const nav = document.querySelector('.header__nav')

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('is-open')
      hamburger.classList.toggle('is-active')
    })
  }
}
