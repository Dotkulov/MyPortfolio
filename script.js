function downloadFile(fileName, displayName) {
    const notification = document.getElementById('downloadNotification');
    const notificationText = document.getElementById('notificationText');

    notificationText.textContent = `Началась загрузка файла "${displayName}"`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function animateSkills() {
    const skills = document.querySelectorAll('.skill-value');

    // Анимируем каждую шкалу до её целевого значения
    skills.forEach((skill, index) => {
        // Получаем целевую ширину из data-атрибута
        const targetWidth = skill.getAttribute('data-original-width');

        // Анимируем с задержкой для последовательного эффекта
        setTimeout(() => {
            skill.style.width = targetWidth;
        }, 100 * index);
    });
}

// Сохраняем оригинальные ширины при загрузке
document.addEventListener('DOMContentLoaded', function () {
    const skills = document.querySelectorAll('.skill-value');
    skills.forEach(skill => {
        const targetWidth = skill.style.width;
        skill.setAttribute('data-original-width', targetWidth);
        // Устанавливаем изначальную ширину как указано в HTML
        skill.style.width = targetWidth;
    });
});

// Автоматическая анимация при загрузке (отключена)
// window.addEventListener('load', function() {
//     setTimeout(animateSkills, 1000);
// });

// Анимация при прокрутке к секции навыков (отключена)
// const skillsSection = document.getElementById('skills');
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             setTimeout(animateSkills, 300);
//         }
//     });
// }, { threshold: 0.3 });

// if (skillsSection) {
//     observer.observe(skillsSection);
// }

document.addEventListener('DOMContentLoaded', function () {
    const astronaut = document.getElementById('interactive-astronaut');

    document.addEventListener('mousemove', function (e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        astronaut.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px) rotate(${(x - 0.5) * 10}deg)`;

        const leftArm = document.querySelector('.arm-left');
        const rightArm = document.querySelector('.arm-right');

        leftArm.style.transform = `rotate(${(y - 0.5) * 15}deg)`;
        rightArm.style.transform = `rotate(${(y - 0.5) * -15}deg)`;
    });

    astronaut.addEventListener('click', function () {
        astronaut.style.animation = 'astronautJump 0.5s ease';
        setTimeout(() => {
            astronaut.style.animation = 'astronaut 20s linear infinite';
        }, 500);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');

        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.getElementById('sliderContainer');
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDots = document.getElementById('sliderDots');

    let currentSlide = 0;
    const totalSlides = sliderItems.length;
    let autoSlideInterval;

    sliderItems.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateSlider() {
        sliderItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        sliderItems[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
        resetAutoSlide();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    sliderNext.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    sliderPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    const autoScrollIndicator = document.createElement('div');
    autoScrollIndicator.className = 'auto-scroll-indicator';
    autoScrollIndicator.innerHTML = '';
    document.querySelector('.portfolio-slider').appendChild(autoScrollIndicator);

    updateSlider();
    startAutoSlide();
});

document.addEventListener('DOMContentLoaded', function () {
    const starsContainer = document.getElementById('interactive-stars');
    const heroSection = document.getElementById('hero');

    function createStars() {
        const starsCount = 50;

        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'interactive-star';

            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;

            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;

            starsContainer.appendChild(star);

            star.addEventListener('mouseover', function () {
                this.style.transform = 'scale(3)';
                this.style.background = 'var(--accent-color)';
                this.style.boxShadow = '0 0 20px var(--accent-color)';
            });

            star.addEventListener('mouseout', function () {
                this.style.transform = 'scale(1)';
                this.style.background = 'white';
                this.style.boxShadow = 'none';
            });

            star.addEventListener('click', function () {
                createParticleExplosion(this);
            });
        }
    }

    function createParticleExplosion(star) {
        const particles = 8;
        const rect = star.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const angle = (i / particles) * Math.PI * 2;
            const velocity = Math.random() * 50 + 30;
            const size = Math.random() * 4 + 2;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: ${i % 2 === 0 ? 'var(--primary-color)' : 'var(--accent-color)'};
            `;

            document.body.appendChild(particle);

            const endX = x + Math.cos(angle) * velocity;
            const endY = y + Math.sin(angle) * velocity;

            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.2, 0, 0.8, 1)'
            }).onfinish = () => particle.remove();
        }

        star.style.opacity = '0';
        setTimeout(() => {
            star.style.opacity = '1';
        }, 1000);
    }

    createStars();
});

document.addEventListener('DOMContentLoaded', function () {
    const skillCategories = document.querySelectorAll('.skill-category');

    function animateOnScroll() {
        skillCategories.forEach(category => {
            const rect = category.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;

            if (isVisible) {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }
        });
    }

    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

document.addEventListener('DOMContentLoaded', function () {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxLayers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const movement = -(rate * depth);
            const transform = `translate3d(0, ${movement}px, 0)`;

            layer.style.transform = transform;
        });
    }

    function mouseParallax(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        parallaxLayers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const moveX = (mouseX - 0.5) * 50 * depth;
            const moveY = (mouseY - 0.5) * 50 * depth;

            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    }

    let isMouseMoving = false;
    let mouseTimeout;

    document.addEventListener('mousemove', function (e) {
        isMouseMoving = true;
        mouseParallax(e);

        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });

    window.addEventListener('scroll', function () {
        if (!isMouseMoving) {
            updateParallax();
        }
    });

    const colorThemes = [
        { primary: '#6c5ce7', secondary: '#a29bfe', accent: '#fd79a8' },
        { primary: '#00b894', secondary: '#55efc4', accent: '#ffeaa7' },
        { primary: '#e17055', secondary: '#fab1a0', accent: '#fdcb6e' },
        { primary: '#0984e3', secondary: '#74b9ff', accent: '#a29bfe' }
    ];

    let currentTheme = 0;

    const themeButton = document.createElement('button');
    themeButton.id = 'theme-toggle';
    themeButton.innerHTML = '<i class="fas fa-palette"></i>';
    themeButton.title = 'Сменить тему';
    document.body.appendChild(themeButton);

    themeButton.addEventListener('click', function () {
        currentTheme = (currentTheme + 1) % colorThemes.length;
        const theme = colorThemes[currentTheme];

        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--accent-color', theme.accent);

        document.body.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});