document.addEventListener('DOMContentLoaded', () => {
    // Enable animations since JS loaded
    document.body.classList.add('js-enabled');

    // === Mobile Menu Toggle ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinksContainer = document.querySelector('.nav-links');
    const headerBtn = document.querySelector('.nav-actions .btn');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('menu-open');

        if (navbar.classList.contains('menu-open')) {
            navLinksContainer.style.display = 'flex';
            if (window.innerWidth <= 768) {
                headerBtn.style.display = 'inline-flex';
            }
        } else {
            navLinksContainer.style.display = '';
            headerBtn.style.display = '';
        }
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a, .nav-actions a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('menu-open');
                navLinksContainer.style.display = '';
                headerBtn.style.display = '';
            }
        });
    });

    // === Navbar Scroll Effect ===
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        highlightNavLinks();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init

    // === Smooth Scrolling for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // === Scrollspy for Active Link in Navbar ===
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNavLinks() {
        let scrollY = window.pageYOffset;
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            // Add a little offset for better UX
            const sectionTop = section.offsetTop - navbar.offsetHeight - 50;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }

    // === Intersection Observer for Fade-In Animations ===
    const faders = document.querySelectorAll('.fade-in');

    // Fallback if browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        faders.forEach(fader => fader.classList.add('appear'));
    } else {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    // === Phone Mask ===
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // === Formulário de Contato e Modal ===
    const contactForm = document.querySelector('.contact-form');
    const successModal = document.getElementById('success-modal');
    const borderWrap = document.querySelector('.modal-border-wrap');
    if (successModal) {
        const closeModalBtn = successModal.querySelector('.close-modal');
        const modalBtn = successModal.querySelector('.btn-modal');

        // Função para abrir o modal
        function openModal() {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Inicia animação da borda após pequeno delay
            setTimeout(() => {
                borderWrap.classList.add('animate-border');
            }, 100);
        }

        // Função para fechar o modal
        function closeModal() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
            borderWrap.classList.remove('animate-border');
        }

        // Eventos de clique
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modalBtn) modalBtn.addEventListener('click', closeModal);

        // Fechar ao clicar fora
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });

        // Intercepta e controla o envio do formulário, barrando o redirecionamento
        // (Removido para permitir o redirecionamento nativo do FormSubmit para a página de obrigado)
    }
});
