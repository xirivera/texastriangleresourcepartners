// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuIcon.textContent = '☰';
    } else {
        mobileNav.classList.add('active');
        menuIcon.textContent = '✕';
    }
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if open
        const mobileNav = document.getElementById('mobile-nav');
        const menuIcon = document.getElementById('menu-icon');
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuIcon.textContent = '☰';
        }
    }
}

// Service Tab Management
function setActiveService(serviceType) {
    // Update tabs
    const tabs = document.querySelectorAll('.service-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`tab-${serviceType}`).classList.add('active');

    // Update content panels
    const panels = document.querySelectorAll('.service-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(`content-${serviceType}`).classList.add('active');
}

// Initialize EmailJS - Wait for EmailJS to be loaded
function initializeEmailJS() {
    console.log('Initializing EmailJS...');
    if (typeof emailjs !== 'undefined') {
        emailjs.init('EJcYq0Wg8xoDkZIgQ');
        console.log('EmailJS initialized successfully with public key: EJcYq0Wg8xoDkZIgQ');
        return true;
    } else {
        console.error('EmailJS not loaded yet');
        return false;
    }
}

// Quote Form Submission with enhanced debugging
function setupQuoteForm() {
    console.log('Setting up quote form...');
    const quoteForm = document.getElementById('quoteForm');
    
    if (!quoteForm) {
        console.error('Quote form not found!');
        return;
    }
    
    console.log('Quote form found:', quoteForm);

    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Quote form submitted');

        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS is not available');
            alert('Email service is not available. Please try again later.');
            return;
        }

        const submitButton = quoteForm.querySelector('button[type="submit"]');
        if (!submitButton) {
            console.error('Submit button not found');
            return;
        }

        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Prepare template parameters with debugging
        const templateParams = {
            company_name: quoteForm.companyName.value,
            contact_name: quoteForm.contactName.value,
            email: quoteForm.email.value,
            phone: quoteForm.phone.value || 'Not provided',
            material_type: quoteForm.materialType.value || 'Not specified',
            quantity: quoteForm.quantity.value || 'Not specified',
            frequency: quoteForm.frequency.value || 'Not specified',
            location: quoteForm.location.value || 'Not specified',
            message: quoteForm.message.value || 'No additional requirements'
        };

        console.log('Template parameters:', templateParams);
        console.log('Service ID: service_s1uqagc');
        console.log('Template ID: template_iarewgh');

        // Send email using EmailJS
        emailjs.send('service_s1uqagc', 'template_iarewgh', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you for your quote request! We will contact you within 24 hours.');
                quoteForm.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, function(error) {
                console.error('FAILED...', error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                alert('Sorry, there was an error sending your request. Please try again or email us directly at quotes@txtrirp.com');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
    });
    
    console.log('Quote form event listener attached successfully');
}

// Wait for both DOM and EmailJS to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Try to initialize EmailJS immediately
    let emailjsReady = initializeEmailJS();
    
    if (emailjsReady) {
        setupQuoteForm();
    } else {
        // If EmailJS not ready, wait a bit and try again
        console.log('Waiting for EmailJS to load...');
        setTimeout(function() {
            if (initializeEmailJS()) {
                setupQuoteForm();
            } else {
                console.error('EmailJS failed to load after timeout');
            }
        }, 1000);
    }
});

// Also try when window loads (as backup)
window.addEventListener('load', function() {
    console.log('Window loaded');
    
    // Double-check that form is set up
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm && !quoteForm.hasAttribute('data-emailjs-setup')) {
        console.log('Setting up form as backup...');
        if (initializeEmailJS()) {
            setupQuoteForm();
            quoteForm.setAttribute('data-emailjs-setup', 'true');
        }
    }
});