const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    alert('Thank you for contacting Motus Drive! We will get back to you soon.');
    contactForm.reset();
  });
}

// Advanced Landing Page Animations
class LandingPageAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupGSAPAnimations();
    this.setupCounters();
    this.setupIntersectionObserver();
    this.setupButtonInteractions();
    this.setupParallaxEffects();
  }

  setupGSAPAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, using fallback animations');
      this.setupFallbackAnimations();
      return;
    }

    // Hero animations timeline
    const heroTimeline = gsap.timeline({ delay: 0.5 });
    
    heroTimeline
      .to('.hero-badge', { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      })
      .to('.title-line', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power2.out" 
      }, "-=0.3")
      .to('.hero-description', { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4")
      .to('.hero-buttons', { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.3")
      .to('.hero-stats', { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.3")
      .to('.hero-visual', { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.6");

    // Scroll-triggered animations if ScrollTrigger is available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.to('.section-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 80%',
        }
      });

      gsap.to('.section-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: '.section-subtitle',
          start: 'top 80%',
        }
      });

      gsap.to('.feature-card', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        }
      });

      gsap.to('.cta-content h2, .cta-content p, .btn-cta', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 80%',
        }
      });
    }
  }

  setupFallbackAnimations() {
    // Fallback CSS animations if GSAP is not available
    setTimeout(() => {
      document.querySelectorAll('.hero-badge, .title-line, .hero-description, .hero-buttons, .hero-stats, .hero-visual').forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0) translateX(0)';
          element.style.transition = 'all 0.6s ease-out';
        }, index * 200);
      });
    }, 500);
  }

  setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current).toLocaleString();
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'all 0.6s ease-out';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .section-title, .section-subtitle').forEach(el => {
      observer.observe(el);
    });
  }

  setupButtonInteractions() {
    // Get Started Button
    document.getElementById('getStartedBtn')?.addEventListener('click', () => {
      this.animatePageTransition(() => {
        alert('Redirecting to registration...');
      });
    });

    // Watch Video Button
    document.getElementById('watchVideoBtn')?.addEventListener('click', () => {
      this.showVideoModal();
    });

    // Join Now Button
    document.getElementById('joinNowBtn')?.addEventListener('click', () => {
      this.showRegistrationForm();
    });

    // Button hover effects
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05) translateY(-2px)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1) translateY(0)';
      });
    });
  }

  setupParallaxEffects() {
    // Mouse follow effect for floating shapes
    document.addEventListener('mousemove', (e) => {
      const shapes = document.querySelectorAll('.shape');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const translateX = x * 50 * speed;
        const translateY = y * 50 * speed;
        
        if (typeof gsap !== 'undefined') {
          gsap.to(shape, {
            x: translateX,
            y: translateY,
            duration: 1,
            ease: "power2.out"
          });
        } else {
          shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
          shape.style.transition = 'transform 1s ease-out';
        }
      });
    });
  }

  animatePageTransition(callback) {
    if (typeof gsap !== 'undefined') {
      gsap.to('body', {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          callback();
          gsap.to('body', { opacity: 1, duration: 0.3 });
        }
      });
    } else {
      document.body.style.opacity = '0.5';
      setTimeout(() => {
        callback();
        document.body.style.opacity = '1';
      }, 300);
    }
  }

  showVideoModal() {
    // Create a modal for video demo
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Motus Drive Demo</h3>
          <button class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="video-placeholder">
            <i class="fas fa-play-circle"></i>
            <p>Demo video would play here</p>
            <p style="font-size: 0.9rem; color: #888; margin-top: 10px;">Coming soon...</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = `
      .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        backdrop-filter: blur(10px);
      }
      
      .modal-content {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-radius: 20px;
        width: 90%;
        max-width: 800px;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .close-btn:hover {
        color: #667eea;
        transform: scale(1.1);
      }
      
      .modal-body {
        padding: 40px 30px;
      }
      
      .video-placeholder {
        text-align: center;
        padding: 60px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .video-placeholder i {
        font-size: 4rem;
        color: #667eea;
        margin-bottom: 20px;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = modalStyles;
    document.head.appendChild(style);
    
    // Animate modal in
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.style.transition = 'opacity 0.3s ease';
      modal.querySelector('.modal-content').style.transform = 'scale(1)';
      modal.querySelector('.modal-content').style.transition = 'transform 0.4s ease';
    }, 10);
    
    // Close modal functionality
    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
      }, 300);
    };
    
    modal.querySelector('.close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  showRegistrationForm() {
    alert('Registration form would open here. You can integrate this with your actual registration system.');
  }
}

// Enhanced Navbar functionality (keeping your existing code)
class NavbarManager {
  constructor() {
    this.currentUserType = 'guest'; // guest, learner, instructor, admin
    this.init();
  }

  init() {
    this.setupMobileToggle();
    this.setupDropdowns();
    this.setupAnimations();
    // Set initial navigation based on user type
    this.showNavigation(this.currentUserType);
  }

  // Setup smooth animations
  setupAnimations() {
    // Add stagger animation to navigation items
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      link.style.animationDelay = `${index * 0.1}s`;
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.nav-link').forEach(link => {
      observer.observe(link);
    });
  }

  // Enhanced mobile menu toggle
  setupMobileToggle() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Add body scroll lock when mobile menu is open
        if (navMenu.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Enhanced dropdown handling
  setupDropdowns() {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });

    // Handle logout with animation
    document.querySelectorAll('.logout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.animatedLogout();
      });
    });

    // Add click handlers for auth options
    document.querySelectorAll('.auth-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const href = option.getAttribute('href');
        
        // Add ripple effect
        this.createRipple(e, option);
        
        // Handle different login types
        setTimeout(() => {
          if (href && href.includes('instructor')) {
            this.login('instructor', { name: 'Instructor User' });
          } else if (href && href.includes('learner')) {
            this.login('learner', { name: 'Learner User' });
          } else if (href && href.includes('admin')) {
            this.login('admin', { name: 'Admin User' });
          }
        }, 300);
      });
    });
  }

  // Create ripple effect for buttons
  createRipple(event, element) {
    const button = element;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Show navigation with smooth transition
  showNavigation(userType) {
    // Hide all navigation types with fade out
    document.querySelectorAll('.nav-links').forEach(nav => {
      nav.style.opacity = '0';
      nav.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        nav.classList.add('hidden');
      }, 200);
    });

    // Show specific navigation with fade in
    setTimeout(() => {
      const targetNav = document.getElementById(`${userType}Nav`);
      if (targetNav) {
        targetNav.classList.remove('hidden');
        setTimeout(() => {
          targetNav.style.opacity = '1';
          targetNav.style.transform = 'translateY(0)';
        }, 50);
      }
    }, 200);

    this.currentUserType = userType;
  }

  // Enhanced login with animation
  login(userType, userData) {
    // Add loading animation
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
      loginBtn.style.transform = 'scale(0.95)';
      loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    }

    setTimeout(() => {
      this.showNavigation(userType);
      
      // Update user name in dropdown with animation
      const userNameElements = document.querySelectorAll('.user-name');
      userNameElements.forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
          element.textContent = userData.name || 'User';
          element.style.opacity = '1';
        }, 200);
      });

      // Show success notification
      this.showNotification(`Welcome ${userData.name}!`, 'success');

      console.log(`Logged in as ${userType}:`, userData);
    }, 1000);
  }

  // Animated logout
  animatedLogout() {
    if (confirm('Are you sure you want to logout?')) {
      // Add logout animation
      const navbar = document.querySelector('.navbar');
      navbar.style.transform = 'translateY(-10px)';
      navbar.style.opacity = '0.8';
      
      setTimeout(() => {
        this.showNavigation('guest');
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
        
        // Show logout notification
        this.showNotification('Successfully logged out!', 'info');
        
        console.log('User logged out');
        
        // Redirect to home page with smooth transition
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }, 500);
    }
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                   type === 'error' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      transform: translateX(400px);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        notification.remove();
      }, 400);
    }, 3000);
  }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .nav-links {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navbar
  window.navbarManager = new NavbarManager();
  
  // Initialize landing page animations
  window.landingAnimations = new LandingPageAnimations();
});

// Add smooth scrolling for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});



// Add responsive behavior management
class ResponsiveManager {
  constructor() {
    this.breakpoints = {
      mobile: 768,
      tablet: 1024,
      desktop: 1366
    };
    this.currentBreakpoint = this.getCurrentBreakpoint();
    this.init();
  }

  init() {
    this.setupResizeListener();
    this.adjustForDevice();
  }

  getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= this.breakpoints.mobile) return 'mobile';
    if (width <= this.breakpoints.tablet) return 'tablet';
    if (width <= this.breakpoints.desktop) return 'laptop';
    return 'desktop';
  }

  setupResizeListener() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newBreakpoint = this.getCurrentBreakpoint();
        if (newBreakpoint !== this.currentBreakpoint) {
          this.currentBreakpoint = newBreakpoint;
          this.adjustForDevice();
        }
      }, 250);
    });
  }

  adjustForDevice() {
    this.adjustAnimationsForDevice();
    this.adjustUIForDevice();
  }

  adjustAnimationsForDevice() {
    const isMobile = this.currentBreakpoint === 'mobile';
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach(shape => {
      if (isMobile) {
        // Reduce animation complexity on mobile
        shape.style.animationDuration = '30s';
      } else {
        shape.style.animationDuration = '20s';
      }
    });
  }

  adjustUIForDevice() {
    const heroStats = document.querySelector('.hero-stats');
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (this.currentBreakpoint === 'mobile') {
      // Mobile specific adjustments
      if (heroStats) {
        heroStats.style.flexDirection = 'row';
        heroStats.style.flexWrap = 'wrap';
      }
      
      // Optimize touch targets
      featureCards.forEach(card => {
        card.style.minHeight = '44px';
      });
    } else {
      // Desktop specific adjustments
      if (heroStats) {
        heroStats.style.flexDirection = 'row';
        heroStats.style.flexWrap = 'nowrap';
      }
    }
  }
}

// Enhanced touch support for mobile devices
class TouchManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupTouchEvents();
    this.optimizeForTouch();
  }

  setupTouchEvents() {
    // Add touch feedback for buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta, .feature-card').forEach(element => {
      element.addEventListener('touchstart', this.handleTouchStart.bind(this));
      element.addEventListener('touchend', this.handleTouchEnd.bind(this));
    });
  }

  handleTouchStart(e) {
    e.currentTarget.style.transform = 'scale(0.95)';
    e.currentTarget.style.transition = 'transform 0.1s ease';
  }

  handleTouchEnd(e) {
    setTimeout(() => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.transition = '';
    }, 100);
  }

  optimizeForTouch() {
    // Ensure minimum touch target size
    const touchElements = document.querySelectorAll('.nav-link, .btn-primary, .btn-secondary, .btn-cta');
    touchElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.height < 44) {
        element.style.minHeight = '44px';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
      }
    });
  }
}

// Update the main initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize existing managers
  window.navbarManager = new NavbarManager();
  window.landingAnimations = new LandingPageAnimations();
  
  // Initialize responsive managers
  window.responsiveManager = new ResponsiveManager();
  window.touchManager = new TouchManager();
  
  // Optimize performance on mobile
  if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.querySelectorAll('.shape').forEach(shape => {
      shape.style.willChange = 'transform';
    });
    
    // Use passive event listeners for better scroll performance
    document.addEventListener('scroll', () => {
      // Throttled scroll handling for mobile
    }, { passive: true });
  }
});
