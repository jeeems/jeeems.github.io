window.addEventListener('load', function() {
    const brandText = document.getElementById('brand-text');

    function triggerAnimation() {
        brandText.classList.add('expand');
        setTimeout(() => {
            brandText.classList.remove('expand');
        }, 2000); // Duration of the animation
    }

    // Optional: Trigger animation immediately on page load
    triggerAnimation();

    // Background color change on mousemove
    document.addEventListener("mousemove", function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Calculate background color based on cursor position
        const red = Math.floor(255 * x);
        const green = Math.floor(255 * y);
        const blue = Math.floor(255 * (1 - x));

        document.body.style.backgroundColor = `rgb(${red + 245}, ${green + 245}, ${blue + 245})`; // Off-white background interaction
    });

    // Back-to-Top Button Functionality
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const brandText = document.getElementById('brand-text');
    const finalText = "Jemuel Olaybar";
    const initialText = "JO";
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

    function decrypt() {
        let iteration = 0;
        brandText.classList.remove('initial');
        brandText.classList.add('expanded');
        const interval = setInterval(() => {
            brandText.innerText = finalText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return finalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if(iteration >= finalText.length) {
                clearInterval(interval);
                setTimeout(encrypt, 10000); // Wait 2 seconds before encrypting
            }

            iteration += 1 / 3;
        }, 30);
    }

    function encrypt() {
        let iteration = 0;
        brandText.classList.remove('expanded');
        brandText.classList.add('initial');
        const interval = setInterval(() => {
            brandText.innerText = finalText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return initialText[index] || " ";
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if(iteration >= finalText.length) {
                brandText.innerText = initialText;
                clearInterval(interval);
                setTimeout(decrypt, 10000); // Wait 2 seconds before decrypting again
            }

            iteration += 1 / 3;
        }, 30);
    }

    // Initialize with 'initial' class
    brandText.classList.add('initial');

    // Start the animation
    decrypt();
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.navbar-nav .nav-item .nav-link');

    function onScroll() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 60) { // 60 is navbar height
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === currentSection) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
});

document.addEventListener('DOMContentLoaded', function() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    const fadeInOptions = {
        threshold: 0.5
    };

    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, fadeInOptions);

    fadeInSections.forEach(section => {
        fadeInObserver.observe(section);
    });
});


/// Load EmailJS SDK
(function() {
    emailjs.init("zAO26tE049kwk--1M"); // Replace with your User ID from the Account page
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = this;
    
    // Log form data for debugging
    console.log('Form data:', {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    });

    // Prepare the template parameters
    const templateParams = {
        subject: "A person wants to connect with you from your website",
        to_email: "jemuel.olaybar@gmail.com", // Your email
        to_name: "Jemuel Olaybar",
        from_name: form.name.value,
        from_email: form.email.value,
        message: form.message.value
    };

    // Log template parameters for debugging
    console.log('Template parameters:', templateParams);

    // Send email to you
    emailjs.send("service_4d5sfeb", "email_to_jem", templateParams)
    .then(function(response) {
        console.log('Email sent to you successfully', response);
       
        // Send auto-reply to sender's email
        return emailjs.send("service_4d5sfeb", "auto_reply", {
            to_name: form.name.value,
            to_email: form.email.value, // This sends the auto-reply to the form submitter's email
            from_name: "Jemuel Olaybar",  // Your name
            from_email: "jemuel.olaybar@gmail.com",  // Your email
            reply_message: "Thank you for contacting me. I will get back to you soon."
        });
    })
    .then(function(response) {
        console.log('Auto-reply sent successfully', response);
        alert('Your message has been sent successfully. Thank you for contacting me!');
        form.reset();
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('Oops! There was an error sending your message. Please try again later.');
    });
});
