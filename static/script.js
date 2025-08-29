document.addEventListener('DOMContentLoaded', () => {
    // ==============================
    // CARROSSEL
    // ==============================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Funções para atualizar os indicadores
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const indicators = [];

    function createIndicators() {
        for (let i = 0; i < totalSlides; i++) {
            const button = document.createElement('button');
            button.setAttribute('data-slide-to', i);
            button.addEventListener('click', () => {
                goToSlide(i);
                pauseAutoPlay();
            });
            indicatorsContainer.appendChild(button);
            indicators.push(button);
        }
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        updateIndicators();
    }

    function changeSlide(direction) {
        slides[currentSlide].classList.remove('active');
        currentSlide += direction;

        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;

        slides[currentSlide].classList.add('active');
        updateIndicators();
    }

    function autoPlay() {
        changeSlide(1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(autoPlay, 5000);
    }

    function pauseAutoPlay() {
        clearInterval(autoPlayInterval);
        setTimeout(startAutoPlay, 10000);
    }

    // Botões
    document.querySelector('.prev-btn').addEventListener('click', () => {
        changeSlide(-1);
        pauseAutoPlay();
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        changeSlide(1);
        pauseAutoPlay();
    });

    // Swipe para mobile
    let startX = 0;
    let endX = 0;
    const carouselContainer = document.querySelector('.carousel-container');

    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                changeSlide(1); // esquerda
            } else {
                changeSlide(-1); // direita
            }
            pauseAutoPlay();
        }
    }

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
            pauseAutoPlay();
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
            pauseAutoPlay();
        }
    });

    // Pausa autoplay quando aba não está visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoPlayInterval);
        } else {
            startAutoPlay();
        }
    });

    // Inicia autoplay e cria indicadores
    createIndicators();
    startAutoPlay();

    // ==============================
    // MENU MOBILE
    // ==============================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==============================
    // SMOOTH SCROLL
    // ==============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==============================
    // HEADER SCROLL EFFECT
    // ==============================
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // ==============================
    // PRELOAD IMAGENS
    // ==============================
    function preloadImages() {
        const imageUrls = [
            '../static/assets/Foto1.png',
            '../static/assets/Foto2.png',
            '../static/assets/Foto3.png',
            '../static/assets/Foto4.png'
        ];
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    preloadImages();

    // Marca slide como "loaded"
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        img.addEventListener('load', () => {
            slide.classList.add('loaded');
        });
    });

    // ==============================
    // ANIMAÇÃO DE ENTRADA SEÇÕES
    // ==============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

