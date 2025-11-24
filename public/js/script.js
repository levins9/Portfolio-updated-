// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = function() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
};

// Check on load
window.addEventListener('load', fadeInOnScroll);
// Check on scroll
window.addEventListener('scroll', fadeInOnScroll);

// Button hover effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Skill card interactions
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

function initializeSkillBars() {
    const skillProgressElements = document.querySelectorAll('.skill-progress');
    
    skillProgressElements.forEach(progress => {
        const level = progress.getAttribute('data-level');
        const skillBar = progress.parentElement;
        
        // Create percentage display
        const levelDisplay = document.createElement('span');
        levelDisplay.className = 'skill-level';
        levelDisplay.textContent = `${level}%`;
        skillBar.appendChild(levelDisplay);
        
        // Store original level for hover effect
        progress.setAttribute('data-original-level', level);
        
        // Animate the progress bar after a short delay
        setTimeout(() => {
            progress.style.width = `${level}%`;
        }, 300);
    });
}

function addHoverEffects() {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            const progress = this.querySelector('.skill-progress');
            const originalLevel = progress.getAttribute('data-original-level');
            
            // Store current width before expanding
            progress.style.setProperty('--original-width', `${originalLevel}%`);
            
            // Expand to full width with color enhancement
            progress.style.width = '100%';
            progress.style.transition = 'all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
        });
        
        skill.addEventListener('mouseleave', function() {
            const progress = this.querySelector('.skill-progress');
            const originalLevel = progress.getAttribute('data-original-level');
            
            // Return to original width
            progress.style.width = `${originalLevel}%`;
            progress.style.transition = 'all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
        });
    });
}

// Unified Navigation and Footer Links Functionality
function setupNavigation() {
    // Get all navigation links (header + footer)
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    
    // Function to handle smooth scrolling
    function scrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinksElement = document.querySelector('.nav-links');
            if (window.innerWidth <= 768 && navLinksElement.style.display === 'flex') {
                navLinksElement.style.display = 'none';
            }
        } else {
            console.warn(`Section with ID '${sectionId}' not found`);
        }
    }
    
    // Function to handle link clicks
    function handleLinkClick(e) {
        e.preventDefault();
        
        const linkText = this.textContent.trim().toUpperCase();
        let targetSection = '';
        
        // Map link text to section IDs
        switch(linkText) {
            case 'HOME':
                targetSection = 'home';
                break;
            case 'ABOUT':
                targetSection = 'about';
                break;
            case 'PORTFOLIO':
                targetSection = 'portfolio';
                break;
            case 'CONTACT':
                targetSection = 'contact';
                break;
            case 'GRAPHIC DESIGN':
            case 'WEB DESIGN':
            case 'ILLUSTRATION':
            case 'BRANDING':
                // Service links go to portfolio section
                targetSection = 'portfolio';
                break;
            default:
                targetSection = 'home';
        }
        
        scrollToSection(targetSection);
    }
    
    // Add click events to all navigation and footer links
    navLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
    
    // Handle "View My Work" and "Contact Me" buttons
    const viewWorkBtn = document.querySelector('.btn-outline');
    if (viewWorkBtn && viewWorkBtn.textContent.includes('View My Work')) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('portfolio');
        });
    }
    
    const contactBtns = document.querySelectorAll('.btn-outline');
    contactBtns.forEach(btn => {
        if (btn.textContent.includes('Contact Me')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('contact');
            });
        }
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const headerNavLinks = document.querySelectorAll('.nav-links a');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.getElementById('header').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 50)) {
                currentSection = section.id;
            }
        });
        
        headerNavLinks.forEach(link => {
            link.classList.remove('active');
            const linkText = link.textContent.trim().toUpperCase();
            
            let linkSection = '';
            switch(linkText) {
                case 'HOME':
                    linkSection = 'home';
                    break;
                case 'ABOUT':
                    linkSection = 'about';
                    break;
                case 'PORTFOLIO':
                    linkSection = 'portfolio';
                    break;
                case 'CONTACT':
                    linkSection = 'contact';
                    break;
            }
            
            if (linkSection === currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Portfolio Pop-out Modal Functionality
function setupPortfolioModal() {
    const portfolioButtons = document.querySelectorAll('.portfolio-button');
    const modal = document.getElementById('portfolioModal');
    
    if (!modal) {
        console.warn('Portfolio modal not found');
        return;
    }
    
    const closeBtn = modal.querySelector('.close-btn');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    
    // Project data for each category
    const projects = {
        commissions: {
            title: "COMMISSIONS & CHARACTER DESIGNS",
            category: "Custom Artwork",
            description: "Specializing in unique character designs, illustrations, and custom commissions. From fantasy characters to modern portraits, I bring your ideas to life with attention to detail and creative vision.",
            image: "images/commissions-preview.png",
            link: "commissions.html"
        },
        morjiverse: {
            title: "THE MORJEVERSE",
            category: "Creative Universe",
            description: "Step into The Morjeverse - a collection of worlds, characters, and stories I've created. Explore a fantasy realm and unique characters that inhabit my imagination.",
            image: "images/morjeverse-preview.png",
            link: "morjeverse.html"
        },
        schoolprojects: {
            title: "SCHOOL PROJECTS",
            category: "Academic Work",
            description: "A showcase of my academic journey at Republic Polytechnic. Includes graphic design projects, coding assignments, and creative works developed during my studies.",
            image: "images\schoolprojectspreview.png",
            link: "school-projects.html"
        }
    };
    
    // Add click event to each portfolio button
    portfolioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const project = projects[category];
            
            if (project) {
                // Update modal content
                modalImg.src = project.image;
                modalImg.alt = project.title;
                modalTitle.textContent = project.title;
                modalCategory.textContent = project.category;
                modalDescription.textContent = project.description;
                modalLink.href = project.link;
                
                // Set modal category for styling
                modal.setAttribute('data-category', category);
                
                // Show modal with animation
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking on backdrop
    modal.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSkillBars();
    addHoverEffects();
    setupNavigation();
    setupPortfolioModal();
    
    console.log('All JavaScript functionality loaded successfully!');
});