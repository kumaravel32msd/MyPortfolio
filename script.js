

/* Toggle Icon Navbar */

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* Scroll Sections Active Link */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* Sticky Navbar */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* Remove toggle icon and navbar when clicking navbar link (scroll) */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* Scroll Reveal */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.detail-item', { interval: 100, origin: 'bottom' });
ScrollReveal().reveal('.education-content', { interval: 200, origin: 'right' }); /* Added staggering for education items */
ScrollReveal().reveal('.skills-box', { interval: 200 });
ScrollReveal().reveal('.project-box', { interval: 200 });

/* Progress Bar Animation */
const progressSection = document.querySelector('.languages');
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const width = progressBar.getAttribute('data-width');
        progressBar.style.width = width;
    });
}

function hideProgress() {
    progressBars.forEach(progressBar => {
        progressBar.style.width = 0;
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showProgress();
        } else {
            hideProgress();
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% visible

if (progressSection) {
    observer.observe(progressSection);
}

// Remove old scroll listener if it conflicts, or just rely on this one.
// window.addEventListener('scroll', ...) <- Replaced by IntersectionObserver for better performance


/* 3D Tilt Animation for Home Image */
const homeImg = document.querySelector('.home-img');
const glowingCircle = document.querySelector('.glowing-circle');

if (homeImg && glowingCircle) {
    homeImg.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 25;
        glowingCircle.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    homeImg.addEventListener('mouseleave', () => {
        glowingCircle.style.transform = 'rotateY(0deg) rotateX(0deg)';
        glowingCircle.style.transition = 'transform 0.5s ease';
    });

    homeImg.addEventListener('mouseenter', () => {
        glowingCircle.style.transition = 'none';
    });
}

/* Typed JS */
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'Java Developer', 'UI/UX Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* Contact Form 3D Tilt Animation */
const contactContainer = document.querySelector('.contact-container');
const contactForm = document.querySelector('#contact-form');

if (contactContainer && contactForm) {
    contactContainer.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.clientX) / 20;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 20;
        contactForm.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    contactContainer.addEventListener('mouseenter', () => {
        contactForm.style.transition = 'none';
    });

    contactContainer.addEventListener('mouseleave', () => {
        contactForm.style.transition = 'transform 0.5s ease';
        contactForm.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}

/* EmailJS Integration */
const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const btn = form.querySelector('.btn');
        const originalBtnText = btn.innerText;
        btn.innerText = 'Sending...';

        // NOTE: You need to replace these with your actual Service ID and Template ID
        const serviceID = 'service_hu9ilrd';
        const templateID = 'template_yrr4z4e';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.innerText = 'Sent!';
                alert('Message sent successfully!');
                form.reset();
                setTimeout(() => {
                    btn.innerText = originalBtnText;
                }, 3000);
            }, (err) => {
                btn.innerText = originalBtnText;
                alert(JSON.stringify(err));
                console.error('EmailJS Error:', err);
            });
    });
}
