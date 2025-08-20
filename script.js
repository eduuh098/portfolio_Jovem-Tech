/**
 * PORTFÓLIO RESPONSIVO - JAVASCRIPT
 * Arquivo principal com todas as funcionalidades do site
 * Autor: Eduardo Souza da Costa
 * 
 * PRINCIPAIS FUNCIONALIDADES:
 * - Navegação responsiva com menu mobile
 * - Scroll suave entre seções
 * - Animações de entrada dos elementos
 * - Efeito de digitação no título
 * - Contador animado nas estatísticas
 * - Sistema de partículas
 * - Formulário de contato funcional
 * - Sistema de notificações
 */

// ==================== INICIALIZAÇÃO ==================== 
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfólio carregado com sucesso!');
    
    // Inicializar todas as funcionalidades
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initCounterAnimation();
    initParticles();
    initContactForm();
    initSmoothScroll();
    
    // Adicionar classe de carregamento
    document.body.classList.add('loaded');
});

// ==================== NAVEGAÇÃO RESPONSIVA ==================== 
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle do menu mobile - CORRIGIDO
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Fechar menu mobile ao clicar em um link - CORRIGIDO
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Efeito de scroll na navbar - MELHORADO
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Destacar link ativo na navegação
        highlightActiveSection();
    });
}

// ==================== DESTACAR SEÇÃO ATIVA ==================== 
function highlightActiveSection() {
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
    
    // Remover classe active de todos os links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==================== SCROLL SUAVE PARA SEÇÕES ==================== 
function initSmoothScroll() {
    // Scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(link => {
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
}

// ==================== ANIMAÇÕES DE SCROLL ==================== 
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

    // Observar elementos com animação fade-in
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ==================== EFEITO DE DIGITAÇÃO ==================== 
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
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
        }
    }
    
    // Iniciar efeito após um pequeno atraso
    setTimeout(typeText, 1000);
}

// ==================== CONTADOR ANIMADO DAS ESTATÍSTICAS ==================== 
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ==================== SISTEMA DE PARTÍCULAS ==================== 
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Criar partículas iniciais
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
    
    // Recriar partículas periodicamente
    setInterval(() => {
        if (particlesContainer.children.length < 50) {
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Propriedades aleatórias
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.5 + 0.1;
    const animationDuration = Math.random() * 20 + 10;
    const moveX = (Math.random() - 0.5) * 200;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 0, 250, ${opacity});
        border-radius: 50%;
        pointer-events: none;
        animation: particleMove${Date.now()} ${animationDuration}s linear infinite;
    `;
    
    // Criar animação única para cada partícula
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleMove${Date.now()} {
            0% {
                transform: translateY(0) translateX(0);
                opacity: ${opacity};
            }
            100% {
                transform: translateY(-100vh) translateX(${moveX}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    container.appendChild(particle);
    
    // Remover partícula após animação
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, animationDuration * 1000);
}

// ==================== FORMULÁRIO DE CONTATO ==================== 
function initContactForm() {
    const contactForm = document.getElementById('contato-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    
    if (!contactForm) return;

    // Inicializa o EmailJS com a sua Chave Pública (User ID)
    // Substitua 'YOUR_PUBLIC_KEY' pela sua chave de verdade do EmailJS
    emailjs.init('RthTh7Hp0lVw44qNa');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obter dados do formulário
        const formData = new FormData(contactForm);
        const dados = {
            from_name: formData.get('nome'),
            from_email: formData.get('email'),
            subject: formData.get('assunto'),
            message: formData.get('mensagem')
        };
        
        // Validação
        if (!validateForm(dados)) {
            return;
        }
        
        // Estado de loading
        setLoadingState(true);
        
        try {
            // Substitua os IDs do serviço e do template pelos seus
            const serviceID = 'service_jtl2q6r'; 
            const templateID = 'template_4nczcru';

            await emailjs.send(serviceID, templateID, dados);
            
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            contactForm.reset();         
            
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            setLoadingState(false);
        }
    });
    
    function validateForm(dados) {
        // Validação de campos obrigatórios
        if (!dados.from_name || !dados.from_email || !dados.subject || !dados.message) {
            showNotification('Por favor, preencha todos os campos', 'error');
            return false;
        }
        
        // Validação de email
        if (!isValidEmail(dados.from_email)) {
            showNotification('Por favor, insira um endereço de email válido', 'error');
            return false;
        }
        
        return true;
    }
    
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.textContent = 'Enviando...';
            submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        } else {
            submitBtn.disabled = false;
            btnText.textContent = 'Enviar Mensagem';
            submitBtn.querySelector('i').className = 'fas fa-paper-plane';
        }
    }
}

// ==================== SIMULAÇÃO DE ENVIO DE FORMULÁRIO ==================== 
async function simulateFormSubmission(dados) {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('📧 Dados do formulário:', dados);
    
    /* 
    INTEGRAÇÃO COM SERVIÇOS DE EMAIL:
    
    // OPÇÃO 1: EmailJS
    return emailjs.send('service_id', 'template_id', dados, 'user_id');
    
    // OPÇÃO 2: Formspree
    return fetch('https://formspree.io/f/seu-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    
    // OPÇÃO 3: API própria
    return fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    */
}

// ==================== VALIDAÇÃO DE EMAIL ==================== 
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== SISTEMA DE NOTIFICAÇÕES ==================== 
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    
    // Configurar notificação
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Mostrar notificação
    notification.classList.add('show');
    
    // Esconder após 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 4000);
}

// ==================== EFEITO PARALLAX ==================== 
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== OTIMIZAÇÕES DE PERFORMANCE ==================== 
// Throttle para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Aplicar throttle aos eventos de scroll
window.addEventListener('scroll', throttle(function() {
    highlightActiveSection();
}, 100));

// ==================== TRATAMENTO DE ERROS ==================== 
window.addEventListener('error', function(e) {
    console.error('❌ Erro capturado:', e.error);
    // Aqui você pode implementar um sistema de logging
});

// ==================== LOG DE DESENVOLVIMENTO ==================== 
console.log(`
🎨 PORTFÓLIO EDUARDO SOUZA DA COSTA
📱 Versão: 2.0
🚀 Status: Carregado com sucesso!

Funcionalidades ativas:
✅ Navegação responsiva
✅ Scroll suave
✅ Animações de entrada
✅ Efeito de digitação
✅ Contador animado
✅ Sistema de partículas
✅ Formulário funcional
✅ Notificações
✅ Links clicáveis nas habilidades
✅ Design 100% responsivo

Para configurar o envio de emails:
1. EmailJS: https://www.emailjs.com/
2. Formspree: https://formspree.io/
3. Backend próprio com Node.js/PHP
`);

// ==================== EASTER EGG ==================== 
console.log('%c🎮 Desenvolvido por Eduardo Souza da Costa', 'color: #320afa; font-size: 16px; font-weight: bold;');