import { contactFormHandler } from './modules/contact-form.js'
import { toggleHeaderMenu } from './modules/toggle-header-menu.js'
import { initHeader } from './modules/header.js'

/**
 * Beauty Tips — hashtag filters behave like tabs. On a narrow phone we only tease the first three
 * thumbnails; tapping “View More” reveals the full set. On wider screens you already see everything,
 * and that same control just sends people to Instagram.
 */
function initBeautyTips(root) {
  if (!root) {
    return
  }

  const MOBILE_MAX_VISIBLE = 3
  const COLLAPSE_QUERY = '(max-width: 767px)'

  const filterButtons = root.querySelectorAll('.beauty-tips__filter')
  const cards = root.querySelectorAll('.beauty-tips__card')
  const moreWrap = root.querySelector('.beauty-tips__more-wrap')
  const moreLink = moreWrap?.querySelector('a.beauty-tips__btn')

  const collapseMq = window.matchMedia(COLLAPSE_QUERY)
  let collapseExpanded = false

  function setFiltersActive(activeBtn) {
    const filter = activeBtn.getAttribute('data-filter') || 'all'

    filterButtons.forEach((b) => {
      const on = b === activeBtn
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
  }

  function applyCollapseTruncate() {
    if (!collapseMq.matches) {
      cards.forEach((c) => c.classList.remove('is-beyond-mobile-preview'))
      return
    }

    cards.forEach((c) => c.classList.remove('is-beyond-mobile-preview'))

    if (collapseExpanded) {
      return
    }

    const visible = [...cards].filter((c) => !c.classList.contains('is-hidden'))
    visible.forEach((card, index) => {
      if (index >= MOBILE_MAX_VISIBLE) {
        card.classList.add('is-beyond-mobile-preview')
      }
    })
  }

  function updateMoreWrap() {
    if (!moreWrap) {
      return
    }

    if (!collapseMq.matches) {
      moreWrap.style.removeProperty('display')
      return
    }

    const visible = [...cards].filter((c) => !c.classList.contains('is-hidden'))

    if (visible.length <= MOBILE_MAX_VISIBLE || collapseExpanded) {
      moreWrap.style.display = 'none'
    } else {
      moreWrap.style.removeProperty('display')
    }
  }

  function syncCollapseState() {
    applyCollapseTruncate()
    updateMoreWrap()
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setFiltersActive(btn)
      collapseExpanded = false
      syncCollapseState()
    })
  })

  if (moreLink) {
    moreLink.addEventListener('click', (e) => {
      if (collapseMq.matches && !collapseExpanded) {
        e.preventDefault()
        collapseExpanded = true
        syncCollapseState()
      }
    })
  }

  function onCollapseMqChange() {
    if (!collapseMq.matches) {
      collapseExpanded = false
    }
    syncCollapseState()
  }

  if (collapseMq.addEventListener) {
    collapseMq.addEventListener('change', onCollapseMqChange)
  } else {
    collapseMq.addListener(onCollapseMqChange)
  }

  let resizeTimer
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(syncCollapseState, 100)
  })

  syncCollapseState()
}

const beautyTipsRoot = document.querySelector('.beauty-tips')
if (beautyTipsRoot) {
  initBeautyTips(beautyTipsRoot)
}

// My Work — simple tab swap between makeup and hairstyle galleries
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

function init() {
  toggleHeaderMenu()
  contactFormHandler()
  initHeader()
}

init()
