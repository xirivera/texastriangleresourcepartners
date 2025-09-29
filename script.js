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
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(quoteForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Create email body
            const emailBody = `
New Quote Request from ${data.companyName}

Contact Information:
- Name: ${data.contactName}
- Email: ${data.email}
- Phone: ${data.phone}

Request Details:
- Material Type: ${data.materialType}
- Quantity: ${data.quantity}
- Frequency: ${data.frequency}
- Location: ${data.location}

Additional Requirements:
${data.message}
            `.trim();

            // Open email client
            window.location.href = `mailto:xir@txtrirp.com?subject=Quote Request from ${encodeURIComponent(data.companyName)}&body=${encodeURIComponent(emailBody)}`;

            // Show success message
            alert('Thank you for your quote request! We will contact you within 24 hours.');

            // Reset form
            quoteForm.reset();
        });
    }
});