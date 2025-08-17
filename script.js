// DOM Content Loaded - Inicialização quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initParticles();
    initTypingEffect();
});

// Funcionalidade de navegação
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle do menu mobile
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll suave para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Destacar link ativo na navegação
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Adicionar classe fade-in aos elementos e observá-los
    const elementsToAnimate = document.querySelectorAll('.projeto-card, .habilidade-categoria, .sobre-content, .contato-content');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Animação das barras de habilidades
function initSkillBars() {
    const skillBars = document.querySelectorAll('.habilidade-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                // Animar a barra de habilidade
                setTimeout(() => {
                    skillBar.style.width = targetWidth + '%';
                }, 200);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Manipulação do formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contato-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter dados do formulário
        const formData = new FormData(contactForm);
        const nome = formData.get('nome');
        const email = formData.get('email');
        const assunto = formData.get('assunto');
        const mensagem = formData.get('mensagem');
        
        // Validação simples do formulário
        if (!nome || !email || !assunto || !mensagem) {
            showNotification('Por favor, preencha todos os campos', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um endereço de email válido', 'error');
            return;
        }
        
        // Simular envio do formulário
        showNotification('Mensagem enviada com sucesso!', 'success');
        contactForm.reset();
        
        // Em uma aplicação real, você enviaria os dados para um servidor
        console.log('Formulário enviado:', { nome, email, assunto, mensagem });
    });
}

// Helper para validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type) {
    // Remover notificações existentes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Efeito de partículas para a seção hero
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    // Criar partículas aleatórias
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.5 + 0.1;
    const animationDuration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 0, 250, 1);
        border-radius: 50%;
        opacity: ${opacity};
        animation: particleMove ${animationDuration}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // Remover e recriar partícula após animação
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, animationDuration * 1000);
}

// Adicionar keyframes de animação de partículas
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleMove {
        0% {
            transform: translateY(0) translateX(0);
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
        }
    }
`;
document.head.appendChild(particleStyles);

// Efeito de digitação para o título hero
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Adicionar cursor piscante
            typingElement.style.borderRight = '3px solid #ff073a';
            typingElement.style.animation = 'blink 1s infinite';
        }
    }
    
    // Iniciar efeito de digitação após um pequeno atraso
    setTimeout(typeText, 1000);
}

// Scroll suave para botões hero
document.querySelectorAll('.hero-buttons a').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar animação de carregamento à página
window.addEventListener('load', function() {
    document.body.classList.add('loading');
});

// Efeito parallax para seção hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Adicionar efeito glitch ao logo no hover
document.querySelector('.nav-logo').addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.5s ease-in-out';
});
