const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// remove menu mobile
const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

// qualifi
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification-active");
    });
    target.classList.add("qualification-active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification-active");
    });

    tab.classList.add("qualification-active");
  });
});

// services box
const boxViews = document.querySelectorAll(".services-box"),
  boxBtns = document.querySelectorAll(".services-button"),
  boxCloses = document.querySelectorAll(".services-box-close");

let box = function (boxClick) {
  boxViews[boxClick].classList.add("active-box");
};

boxBtns.forEach((boxBtn, i) => {
  boxBtn.addEventListener("click", () => {
    box(i);
  });
});

boxCloses.forEach((boxClose) => {
  boxClose.addEventListener("click", () => {
    boxViews.forEach((boxView) => {
      boxView.classList.remove("active-box");
    });
  });
});

//scroll section active link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// change bg header
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

//dark light mode------------------
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

//swiper
let swiperPortfolio = new Swiper(".portfolio-container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let swiperTestimonial = new Swiper(".testimonial-container", {
  cssMode: true,
  loop: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    if (entry.target.classList.contains('skill-bar')) {
                        this.animateSkillBar(entry.target);
                    }
                }
            });
        }, observerOptions);

        this.observeElements();
    }

    observeElements() {
        const elementsToObserve = [
            '.fade-in',
            '.slide-in-left',
            '.slide-in-right',
            '.skill-bar'
        ];

        elementsToObserve.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.observer.observe(element);
            });
        });
    }

    animateSkillBar(skillBar) {
        const skillFill = skillBar.querySelector('.skill-fill');
        const targetWidth = skillFill.getAttribute('data-width');

        setTimeout(() => {
            skillFill.style.width = targetWidth;
        }, 300);
    }
}

// Run after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationObserver();
});
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        if (this.validateForm(data)) {
            this.submitForm(data);
        }
    }

    validateForm(data) {
        let isValid = true;
        const fields = ['name', 'email', 'subject', 'message'];

        fields.forEach(field => {
            const input = this.form.querySelector(`[name="${field}"]`);
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        let errorMessage = '';

        this.clearFieldError(input);

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    errorMessage = 'Subject must be at least 5 characters long';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (errorMessage) {
            this.showFieldError(input, errorMessage);
            return false;
        }

        return true;
    }

    showFieldError(input, message) {
        input.style.borderColor = 'var(--error)';

        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--space-1)';
        errorElement.style.display = 'block';

        input.parentNode.appendChild(errorElement);
    }

    clearFieldError(input) {
        input.style.borderColor = '';
        const errorElement = input.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async submitForm(data) {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage();
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
        message.style.cssText = `
            background: var(--success);
            color: white;
            padding: var(--space-4);
            border-radius: var(--border-radius);
            margin-top: var(--space-4);
            display: flex;
            align-items: center;
            gap: var(--space-2);
        `;
        this.form.insertBefore(message, this.form.querySelector('button[type="submit"]'));
        setTimeout(() => message.remove(), 5000);
    }

    showErrorMessage() {
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Sorry, there was an error sending your message. Please try again.';
        message.style.cssText = `
            background: var(--error);
            color: white;
            padding: var(--space-4);
            border-radius: var(--border-radius);
            margin-top: var(--space-4);
            display: flex;
            align-items: center;
            gap: var(--space-2);
        `;
        this.form.insertBefore(message, this.form.querySelector('button[type="submit"]'));
        setTimeout(() => message.remove(), 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactFormManager();
});