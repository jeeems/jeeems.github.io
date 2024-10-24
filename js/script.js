window.addEventListener('load', function() {
     // Force the window to scroll to the top of the page on load
    window.scrollTo(0, 0);
    
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


    window.addEventListener('scroll', () => {
        const backToTopButton = document.getElementById('back-to-top');
        
        // Show button when scrolled 300px down, hide when at the top
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Hide the button immediately after clicking to scroll to top
        const backToTopButton = document.getElementById('back-to-top');
        setTimeout(() => {
            backToTopButton.classList.remove('show');
        }, 600); // Adjust the timeout to match the scroll duration
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
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            navbarCollapse.classList.add('show');
        } else {
            navbarCollapse.classList.remove('show');
        }
        navbarToggler.setAttribute('aria-expanded', isMenuOpen);
    }

    // Toggle the menu on clicking the toggler button
    navbarToggler.addEventListener('click', function(event) {
        event.preventDefault();
        toggleMenu();
    });

    // Close the menu when a link is clicked (for mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
        if (!isClickInside && isMenuOpen) {
            toggleMenu();
        }
    });

    // Adjust menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            navbarCollapse.classList.add('show');
        } else if (!isMenuOpen) {
            navbarCollapse.classList.remove('show');
        }
    });
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

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.photo-carousel');
    const images = carousel.querySelectorAll('.carousel-img');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    let currentIndex = 0;

    // Create shadow overlays
    const leftShadow = document.createElement('div');
    leftShadow.classList.add('shadow-overlay', 'left');
    const rightShadow = document.createElement('div');
    rightShadow.classList.add('shadow-overlay', 'right');
    carousel.appendChild(leftShadow);
    carousel.appendChild(rightShadow);

    function showImage(index) {
        images[currentIndex].classList.remove('active');
        images[index].classList.add('active');
        currentIndex = index;
    }

    function nextImage() {
        let nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    function prevImage() {
        let prevIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(prevIndex);
    }

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Add hover effects
    prevBtn.addEventListener('mouseenter', () => leftShadow.style.opacity = '1');
    prevBtn.addEventListener('mouseleave', () => leftShadow.style.opacity = '0');
    nextBtn.addEventListener('mouseenter', () => rightShadow.style.opacity = '1');
    nextBtn.addEventListener('mouseleave', () => rightShadow.style.opacity = '0');
});

document.getElementById("downloadLink").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent default link behavior
    const userConfirmed = confirm("Do you want to download the Taskmate APK?");
    if (userConfirmed) {
        window.location.href = "files/[APK FILE] Taskmate.apk"; // Link to your APK file
    }
});

document.getElementById("downloadCV").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent default link behavior
    const userConfirmed = confirm("Do you want to download Jemuel's CV?");
    if (userConfirmed) {
        window.location.href = "files/Olaybar, Jemuel G. (Resume).pdf"; // Link to your APK file
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleDesktop = document.getElementById('darkModeToggleDesktop');
    const body = document.body;

    // Function to set dark mode
    function setDarkMode(isDark) {
        body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark);
        updateToggleIcons(isDark);
    }

    // Function to toggle dark mode
    function toggleDarkMode() {
        const isDark = !body.classList.contains('dark-mode');
        setDarkMode(isDark);
    }

    // Function to update toggle button icons
    function updateToggleIcons(isDark) {
        const icon = isDark ? 'fa-sun' : 'fa-moon';
        darkModeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
        darkModeToggleDesktop.innerHTML = `<i class="fas ${icon}"></i>`;
    }

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
    } else {
        // If no preference is saved, check system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);
    }

    // Add click event listeners to both toggle buttons
    darkModeToggle.addEventListener('click', toggleDarkMode);
    darkModeToggleDesktop.addEventListener('click', toggleDarkMode);

    // Listen for system color scheme changes
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (localStorage.getItem('darkMode') === null) {
            setDarkMode(e.matches);
        }
    });
});



// Load EmailJS SDK
(function() {
    emailjs.init("zAO26tE049kwk--1M"); // Replace with your User ID
})();

// Get form, button, and success message elements
const form = document.getElementById('contact-form');
const submitButton = form.querySelector('button[type="submit"]');
const successMessage = document.getElementById('success-message');
const contactSection = document.getElementById('contact');
const contactContent = document.getElementById('contact-content');

// Enable submit button only when all fields are filled
form.addEventListener('input', () => {
    const isFormValid = form.checkValidity();
    submitButton.disabled = !isFormValid;
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Log form data for debugging
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };
    console.log('Form data:', formData);

    // 1. Send "email_to_jem" (This goes to YOUR email, not the sender's)
    emailjs.send("service_4d5sfeb", "email_to_jem", {
        to_email: "jemuel.olaybar@gmail.com",  // Your email address (hardcoded)
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
    })
    .then(function(response) {
        console.log('Email sent to you successfully', response);

        // 2. After sending "email_to_jem", send the "auto_reply" to the sender
        return emailjs.send("service_4d5sfeb", "auto_reply", {
            to_name: formData.name,
            to_email: formData.email,  // This sends the auto-reply to the form submitter
            from_name: "Jemuel Olaybar",  // Your name
            from_email: "jemuel.olaybar@gmail.com",  // Your email address
            reply_message: "Thank you for contacting me. I will get back to you soon."
        });
    })
    .then(function(response) {
        console.log('Auto-reply sent successfully', response);

        // Animate the contact section into an envelope
        contactSection.classList.add('envelope-animation');

        // Hide form content during animation
        contactContent.style.display = 'none';

        // Show success message after the envelope flies away
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 3000);  // 3 seconds to complete the animation

        // Reset the form and return the contact section to its original state
        setTimeout(() => {
            // Remove envelope animation class to restore the original form
            contactSection.classList.remove('envelope-animation');
            contactContent.style.display = 'block';  // Show form again
            form.reset();
            submitButton.disabled = true;  // Disable button again after reset

            // Hide the success message after a delay (e.g., 5 seconds)
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);  // Hide the success message after 3 seconds
        }, 5000);  // Delay of 5 seconds to match the animation
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('Oops! There was an error sending your message. Please try again later.');
    });
});
