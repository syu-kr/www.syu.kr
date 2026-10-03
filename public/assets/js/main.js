/**
* Template Name: Arsha
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero editorial motion
   */
  const hero = select('#hero')
  const heroMotion = select('[data-hero-motion]')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (hero && heroMotion) {
    const heroMascotStage = select('#hero .hero-mascot-stage')
    const heroMascotImages = select('#hero .hero-mascot', true)

    if (heroMascotStage && heroMascotImages.length) {
      const decodeHeroImage = (image) => {
        const decode = () => typeof image.decode === 'function' ? image.decode().catch(() => {}) : Promise.resolve()

        if (image.complete && image.naturalWidth > 0) return decode()

        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true })
          image.addEventListener('error', resolve, { once: true })
        }).then(decode)
      }

      Promise.all(heroMascotImages.map(decodeHeroImage)).then(() => {
        window.requestAnimationFrame(() => heroMascotStage.classList.add('is-sunglasses-ready'))
      })
    }

    const resetHeroMotion = () => {
      hero.style.setProperty('--hero-art-x', '0px')
      hero.style.setProperty('--hero-art-y', '0px')
      hero.style.setProperty('--hero-tag-x', '0px')
      hero.style.setProperty('--hero-tag-y', '0px')
      hero.style.setProperty('--hero-outline-x', '0px')
      hero.style.setProperty('--hero-outline-y', '0px')
      hero.style.setProperty('--hero-mascot-x', '0px')
      hero.style.setProperty('--hero-mascot-y', '0px')
    }

    if (window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
      const updateHeroMotion = (event) => {
        const bounds = heroMotion.getBoundingClientRect()
        const relativeX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
        const relativeY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))

        hero.style.setProperty('--hero-art-x', `${(relativeX * 10).toFixed(1)}px`)
        hero.style.setProperty('--hero-art-y', `${(relativeY * 8).toFixed(1)}px`)
        hero.style.setProperty('--hero-tag-x', `${(-relativeX * 13).toFixed(1)}px`)
        hero.style.setProperty('--hero-tag-y', `${(-relativeY * 10).toFixed(1)}px`)
        hero.style.setProperty('--hero-outline-x', `${(-relativeX * 5).toFixed(1)}px`)
        hero.style.setProperty('--hero-outline-y', `${(-relativeY * 4).toFixed(1)}px`)
        hero.style.setProperty('--hero-mascot-x', `${(relativeX * 7).toFixed(1)}px`)
        hero.style.setProperty('--hero-mascot-y', `${(relativeY * 5).toFixed(1)}px`)
      }

      heroMotion.addEventListener('pointermove', updateHeroMotion)
      heroMotion.addEventListener('pointerleave', resetHeroMotion)
      window.addEventListener('blur', resetHeroMotion)
    }

    const heroServiceTags = select('#hero .hero-service-tag', true)
    const compactHeroMaxWidth = 1024
    let compactHeroLayout = false
    let activeHeroServiceIds = []

    const heroServicePool = [
      { id: 'eclass', label: 'eClass 알리미', href: 'https://syu.kr/eclass', isNew: true },
      { id: 'notice', label: '공지 알리미', href: 'https://syu.kr/notice', isNew: true },
      { id: 'bus-live', label: '실시간 셔틀', href: 'https://bus.syu.kr/' },
      { id: 'bus-arrival', label: '셔틀 도착시간', href: 'https://bus.syu.kr/arrivalTime' },
      { id: 'timetable', label: '시간표 마법사', href: 'https://lecture.syu.kr/timetable' },
      { id: 'mock-sugang', label: '모의 수강신청', href: 'https://sugang.syu.kr/testLogin' },
      { id: 'basket', label: '장바구니 경쟁률', href: 'https://sugang.syu.kr/basket' },
      { id: 'sutalk', label: 'SU-TALK 공지', href: 'https://www.syu.kr/sutalk' },
      { id: 'study-room', label: '집중 열람실', href: 'https://library.syu.kr/study' },
      { id: 'library', label: '도서관 좌석', href: 'https://library.syu.kr/' },
      { id: 'food', label: '후문 맛집', href: 'https://food.syu.kr/', isNew: true }
    ]

    const shuffleHeroServices = (services) => {
      const shuffled = [...services]

      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
      }

      return shuffled
    }

    const renderRandomHeroServices = () => {
      const inactiveServices = heroServicePool.filter((service) => !activeHeroServiceIds.includes(service.id))
      const candidates = inactiveServices.length >= heroServiceTags.length ? inactiveServices : heroServicePool
      const selectedServices = shuffleHeroServices(candidates).slice(0, heroServiceTags.length)

      activeHeroServiceIds = selectedServices.map((service) => service.id)

      heroServiceTags.forEach((tag, index) => {
        const service = selectedServices[index]
        const status = service.isNew
          ? '<b>NEW</b>'
          : '<i class="bi bi-arrow-up-right" aria-hidden="true"></i>'

        tag.href = service.href
        tag.innerHTML = `
          <span class="hero-service-index">${String(index + 1).padStart(2, '0')}</span>
          <span>${service.label}</span>
          ${status}
        `
      })
    }

    const restoreDesktopHeroTags = () => {
      heroServiceTags.forEach((tag) => {
        tag.style.removeProperty('left')
        tag.style.removeProperty('top')
        tag.style.removeProperty('right')
        tag.style.removeProperty('bottom')
      })
    }

    const updateHeroServiceTagPositions = () => {
      compactHeroLayout = window.innerWidth <= compactHeroMaxWidth

      if (compactHeroLayout) {
        restoreDesktopHeroTags()
        heroServiceTags.forEach((tag) => {
          tag.style.setProperty('--hero-random-x', '0px')
          tag.style.setProperty('--hero-random-y', '0px')
          tag.style.setProperty('--hero-random-rotate', '0deg')
        })
        return
      }

      restoreDesktopHeroTags()

      heroServiceTags.forEach((tag) => {
        const randomX = Math.random() * 26 - 13
        const randomY = Math.random() * 18 - 9
        const randomRotate = Math.random() * 3.2 - 1.6

        tag.style.setProperty('--hero-random-x', `${randomX.toFixed(1)}px`)
        tag.style.setProperty('--hero-random-y', `${randomY.toFixed(1)}px`)
        tag.style.setProperty('--hero-random-rotate', `${randomRotate.toFixed(2)}deg`)
      })
    }

    const refreshHeroServices = () => {
      if (window.innerWidth <= compactHeroMaxWidth) return

      heroServiceTags.forEach((tag) => tag.classList.add('is-changing'))

      window.setTimeout(() => {
        renderRandomHeroServices()
        updateHeroServiceTagPositions()
        window.requestAnimationFrame(() => {
          heroServiceTags.forEach((tag) => tag.classList.remove('is-changing'))
        })
      }, 200)
    }

    renderRandomHeroServices()
    updateHeroServiceTagPositions()

    if (!reduceMotion) {
      window.setInterval(refreshHeroServices, 5200)
    }

    let heroResizeFrame = null
    window.addEventListener('resize', () => {
      if (heroResizeFrame !== null) return

      heroResizeFrame = window.requestAnimationFrame(() => {
        updateHeroServiceTagPositions()
        heroResizeFrame = null
      })
    }, { passive: true })

    if (!reduceMotion) {
      let heroScrollFrame = null
      const updateHeroScroll = () => {
        const progress = Math.max(0, Math.min(1, window.scrollY / Math.max(hero.offsetHeight * 0.78, 1)))
        hero.style.setProperty('--hero-scroll-y', `${(progress * 34).toFixed(1)}px`)
        hero.style.setProperty('--hero-scroll-copy-y', `${(-progress * 18).toFixed(1)}px`)
        hero.style.setProperty('--hero-scroll-opacity', (1 - progress * 0.32).toFixed(3))
        heroScrollFrame = null
      }

      window.addEventListener('scroll', () => {
        if (heroScrollFrame === null) {
          heroScrollFrame = window.requestAnimationFrame(updateHeroScroll)
        }
      }, { passive: true })
      updateHeroScroll()
    }
  }

  /**
   * Campus pick entrance motion
   */
  const campusPick = select('.campus-pick')

  if (campusPick) {
    campusPick.classList.add('is-motion-ready')

    if (reduceMotion || !('IntersectionObserver' in window)) {
      campusPick.classList.add('is-in-view')
    } else {
      const campusPickObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-in-view')
          observer.unobserve(entry.target)
        })
      }, { threshold: 0.22 })

      campusPickObserver.observe(campusPick)
    }
  }

  /**
   * Shuttle orbit entrance and vehicle depth
   */
  const shuttleOrbit = select('[data-shuttle-motion]')

  if (shuttleOrbit) {
    const shuttleControls = select('.shuttle-control', true)
    shuttleOrbit.classList.add('is-motion-ready')

    const revealShuttleOrbit = () => {
      if (shuttleOrbit.classList.contains('is-in-view')) return

      shuttleOrbit.classList.add('is-in-view')
      shuttleControls.forEach((control) => {
        control.addEventListener('animationend', (event) => {
          if (event.target !== control || event.animationName !== 'shuttle-window-in') return
          control.classList.add('is-settled')
        }, { once: true })
      })
    }

    if (reduceMotion) {
      shuttleOrbit.classList.add('is-in-view')
      shuttleControls.forEach((control) => control.classList.add('is-settled'))
    } else {
      let shuttleRevealFrame = null

      const checkShuttleOrbit = () => {
        const bounds = shuttleOrbit.getBoundingClientRect()

        if (bounds.top <= window.innerHeight * 0.88 && bounds.bottom >= 0) {
          revealShuttleOrbit()
          window.removeEventListener('scroll', queueShuttleReveal)
          window.removeEventListener('resize', queueShuttleReveal)
        }

        shuttleRevealFrame = null
      }

      const queueShuttleReveal = () => {
        if (shuttleRevealFrame !== null) return
        shuttleRevealFrame = window.requestAnimationFrame(checkShuttleOrbit)
      }

      window.addEventListener('scroll', queueShuttleReveal, { passive: true })
      window.addEventListener('resize', queueShuttleReveal)
      queueShuttleReveal()

      if (window.matchMedia('(pointer: fine)').matches) {
        let shuttlePointerFrame = null
        let shuttlePointerEvent = null

        const updateShuttlePointer = () => {
          if (!shuttlePointerEvent || !shuttleOrbit.classList.contains('is-in-view')) {
            shuttlePointerFrame = null
            return
          }

          const bounds = shuttleOrbit.getBoundingClientRect()
          const x = Math.max(-1, Math.min(1, ((shuttlePointerEvent.clientX - bounds.left) / bounds.width - 0.5) * 2))
          const y = Math.max(-1, Math.min(1, ((shuttlePointerEvent.clientY - bounds.top) / bounds.height - 0.5) * 2))

          shuttleOrbit.style.setProperty('--shuttle-shift-x', `${(x * 9).toFixed(1)}px`)
          shuttleOrbit.style.setProperty('--shuttle-shift-y', `${(y * 6).toFixed(1)}px`)
          shuttleOrbit.style.setProperty('--shuttle-rotate-x', `${(-y * 2.2).toFixed(2)}deg`)
          shuttleOrbit.style.setProperty('--shuttle-rotate-y', `${(x * 3.4).toFixed(2)}deg`)
          shuttlePointerFrame = null
        }

        shuttleOrbit.addEventListener('pointermove', (event) => {
          shuttlePointerEvent = event
          if (shuttlePointerFrame === null) {
            shuttlePointerFrame = window.requestAnimationFrame(updateShuttlePointer)
          }
        }, { passive: true })

        shuttleOrbit.addEventListener('pointerleave', () => {
          shuttlePointerEvent = null
          shuttleOrbit.style.setProperty('--shuttle-shift-x', '0px')
          shuttleOrbit.style.setProperty('--shuttle-shift-y', '0px')
          shuttleOrbit.style.setProperty('--shuttle-rotate-x', '0deg')
          shuttleOrbit.style.setProperty('--shuttle-rotate-y', '0deg')
        })
      }
    }
  }

  /**
   * Services section kinetic reveal
   */
  const bentoSection = select('.bento-section')

  if (bentoSection) {
    const bentoHeader = select('.bento-header')
    const bentoCategoryTitles = select('.bento-category-title', true)
    const bentoRows = select('.bento-section .row', true)
    const bentoMotionItems = []

    if (bentoHeader) {
      bentoHeader.classList.add('bento-motion-item', 'bento-motion-item--copy')
      bentoMotionItems.push(bentoHeader)
    }

    bentoCategoryTitles.forEach((title) => {
      title.classList.add('bento-motion-item', 'bento-motion-item--copy')
      bentoMotionItems.push(title)
    })

    bentoRows.forEach((row) => {
      const cards = [...row.children].filter((item) => item.matches('[class*="col-"]'))

      cards.forEach((card, index) => {
        card.classList.add('bento-motion-item', 'bento-motion-item--card')
        card.style.setProperty('--bento-delay', `${Math.min(index, 3) * 32}ms`)
        bentoMotionItems.push(card)
      })
    })

    bentoSection.classList.add('is-motion-ready')

    const settleBentoItem = (item) => {
      item.classList.add('is-in-view')
      item.addEventListener('animationend', (event) => {
        if (event.target !== item) return
        item.classList.add('is-settled')
      }, { once: true })
    }

    if (reduceMotion) {
      bentoMotionItems.forEach((item) => item.classList.add('is-in-view', 'is-settled'))
    } else {
      let bentoMotionFrame = null

      const revealBentoItems = () => {
        const triggerLine = window.innerHeight * 1.18
        let hasPendingItems = false

        bentoMotionItems.forEach((item) => {
          if (item.classList.contains('is-in-view')) return

          if (item.getBoundingClientRect().top <= triggerLine) {
            settleBentoItem(item)
          } else {
            hasPendingItems = true
          }
        })

        if (!hasPendingItems) {
          window.removeEventListener('scroll', queueBentoReveal)
          window.removeEventListener('resize', queueBentoReveal)
        }

        bentoMotionFrame = null
      }

      const queueBentoReveal = () => {
        if (bentoMotionFrame !== null) return
        bentoMotionFrame = window.requestAnimationFrame(revealBentoItems)
      }

      window.addEventListener('scroll', queueBentoReveal, { passive: true })
      window.addEventListener('resize', queueBentoReveal)
      queueBentoReveal()
    }
  }

})()
