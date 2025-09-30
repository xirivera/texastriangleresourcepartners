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

// Quote Form Submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS after DOM is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.init('EJcYq0Wg8xoDkZIgQ');
    }

    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                alert('Email service is not available. Please try again later or email us directly at quotes@txtrirp.com');
                return;
            }

            const submitButton = quoteForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Prepare template parameters
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

            console.log('Sending template parameters:', templateParams);

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
                    alert('Sorry, there was an error sending your request. Please try again or email us directly at quotes@txtrirp.com');
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
});