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
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
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
   * Mobile nav handlers
   */
  const closeMobileNav = () => {
    const navbar = select('#navbar')
    if (navbar && navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile')
      document.body.classList.remove('mobile-nav-active')
      const navbarToggle = select('.mobile-nav-toggle')
      if (navbarToggle) {
        const icon = navbarToggle.querySelector('i')
        if (icon) {
          icon.classList.remove('bi-x')
          icon.classList.add('bi-list')
        }
      }
    }
  }

  const toggleMobileNav = () => {
    const navbar = select('#navbar')
    if (!navbar) return
    const isOpening = !navbar.classList.contains('navbar-mobile')
    navbar.classList.toggle('navbar-mobile')
    if (isOpening) {
      document.body.classList.add('mobile-nav-active')
    } else {
      document.body.classList.remove('mobile-nav-active')
    }
    const navbarToggle = select('.mobile-nav-toggle')
    if (navbarToggle) {
      const icon = navbarToggle.querySelector('i')
      if (icon) {
        icon.classList.toggle('bi-list', !isOpening)
        icon.classList.toggle('bi-x', isOpening)
      }
    }
  }

  on('click', '.mobile-nav-toggle', function(e) {
    e.stopPropagation()
    toggleMobileNav()
  })

  on('click', '.mobile-nav-close', function(e) {
    e.preventDefault()
    e.stopPropagation()
    closeMobileNav()
  })

  on('click', '.mobile-nav-backdrop', function(e) {
    e.preventDefault()
    closeMobileNav()
  })

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileNav()
    }
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()
      closeMobileNav()
      scrollto(this.hash)
    }
  }, true)

  /**
   * Auto close drawer when clicking any non-scrollto link inside drawer
   */
  on('click', '.mobile-nav-drawer a:not(.scrollto)', function(e) {
    closeMobileNav()
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
   * Hero scene tilt
   */
  const heroScene = select('[data-hero-tilt]')
  if (heroScene && window.matchMedia('(pointer: fine)').matches) {
    const resetHeroScene = () => {
      heroScene.style.setProperty('--hero-rotate-x', '0deg')
      heroScene.style.setProperty('--hero-rotate-y', '0deg')
      heroScene.style.setProperty('--hero-shift-x', '0px')
      heroScene.style.setProperty('--hero-shift-y', '0px')
    }

    const updateHeroScene = (event) => {
      const bounds = heroScene.getBoundingClientRect()
      const relativeX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      const relativeY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1

      heroScene.style.setProperty('--hero-rotate-x', `${(-relativeY * 7).toFixed(2)}deg`)
      heroScene.style.setProperty('--hero-rotate-y', `${(relativeX * 9).toFixed(2)}deg`)
      heroScene.style.setProperty('--hero-shift-x', `${(relativeX * 18).toFixed(1)}px`)
      heroScene.style.setProperty('--hero-shift-y', `${(relativeY * 14).toFixed(1)}px`)
    }

    heroScene.addEventListener('pointermove', updateHeroScene)
    heroScene.addEventListener('pointerleave', resetHeroScene)
    window.addEventListener('blur', resetHeroScene)
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()
