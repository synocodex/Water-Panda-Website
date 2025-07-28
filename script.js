// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navClose = document.getElementById("nav-close")
  const navLinks = document.querySelectorAll(".nav__link")
  const header = document.getElementById("header")

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show")
    })
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show")
    })
  }

  // Close menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show")
    })
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Product filtering functionality
  const filterButtons = document.querySelectorAll(".filter__btn")
  const productCards = document.querySelectorAll(".product__card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const filterValue = button.getAttribute("data-filter")

      productCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block"
          card.classList.add("fade-in")
        } else {
          card.style.display = "none"
          card.classList.remove("fade-in")
        }
      })
    })
  })

  // Contact form functionality
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name")
      const email = formData.get("email")
      const phone = formData.get("phone")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      alert("Thank you for your message! We will get back to you soon.")
      this.reset()
    })
  }

  // Newsletter form functionality
  const newsletterForms = document.querySelectorAll(".footer__newsletter")
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector(".footer__input").value

      if (!email) {
        alert("Please enter your email address.")
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      alert("Thank you for subscribing to our newsletter!")
      this.reset()
    })
  })

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll(".btn--primary")
  addToCartButtons.forEach((button) => {
    if (button.textContent.includes("Add to Cart")) {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        const productCard = this.closest(".product__card")
        const productTitle = productCard.querySelector(".product__title").textContent
        const productPrice = productCard.querySelector(".product__price").textContent

        alert(`Added ${productTitle} (${productPrice}) to cart!`)
      })
    }
  })

  // Subscribe functionality
  const subscribeButtons = document.querySelectorAll(".btn--secondary")
  subscribeButtons.forEach((button) => {
    if (button.textContent.includes("Subscribe")) {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        const productCard = this.closest(".product__card")
        const productTitle = productCard.querySelector(".product__title").textContent

        alert(`Subscribed to ${productTitle}! You'll receive regular deliveries with 15% discount.`)
      })
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature__card, .product__card, .step__card, .delivery__card, .practice__card, .certification__card",
  )
  animateElements.forEach((el) => observer.observe(el))

  // Trusted brands slider auto-play
  const trustedTrack = document.querySelector(".trusted__track")
  if (trustedTrack) {
    // Clone items for seamless loop
    const items = trustedTrack.children
    const itemsArray = Array.from(items)
    itemsArray.forEach((item) => {
      const clone = item.cloneNode(true)
      trustedTrack.appendChild(clone)
    })
  }

  // Hero scroll indicator
  const heroScroll = document.querySelector(".hero__scroll")
  if (heroScroll) {
    heroScroll.addEventListener("click", () => {
      const nextSection = document.querySelector(".trusted") || document.querySelector(".features")
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  // Loading animation for images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Set initial opacity
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })

  // Phone and email click handlers
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]')
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]')

  phoneLinks.forEach((link) => {
    link.addEventListener("click", function () {
      console.log("Calling:", this.textContent)
    })
  })

  emailLinks.forEach((link) => {
    link.addEventListener("click", function () {
      console.log("Emailing:", this.textContent)
    })
  })

  // Back to top functionality
  const backToTop = document.createElement("button")
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>'
  backToTop.className = "back-to-top"
  backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #00BFFF;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
    `

  document.body.appendChild(backToTop)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = "1"
      backToTop.style.visibility = "visible"
    } else {
      backToTop.style.opacity = "0"
      backToTop.style.visibility = "hidden"
    }
  })

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Console welcome message
  console.log("%c🐼 Welcome to Water Panda! 💧", "color: #00BFFF; font-size: 20px; font-weight: bold;")
  console.log("%cPurity Delivered to Your Doorstep", "color: #666; font-size: 14px;")
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const handleScroll = debounce(() => {
  const header = document.getElementById("header")
  if (window.scrollY >= 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}, 10)

window.addEventListener("scroll", handleScroll)
