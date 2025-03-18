import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Code2,
  Palette,
  Languages,
  Mail,
  Github,
  Linkedin,
  Loader,
  ExternalLink,
  BookOpen,
  FileJson,
  Coffee,
  Cpu,
  Figma,
  Workflow,
  FileCode,
  Globe,
  Database,
  Server,
  SmartphoneNfc,
  Smartphone,
  Blocks,
  GitBranch,
  PanelRight,
  Cloud,
  Flame,
  PenTool,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const brandTextRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Check system preference on initial load
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDarkMode(prefersDark);

    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Brand text animation
  useEffect(() => {
    if (!brandTextRef.current) return;

    const brandText = brandTextRef.current;
    const finalText = "Jemuel Olaybar";
    const initialText = "JO";
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    function decrypt() {
      let iteration = 0;
      brandText.classList.remove("initial");
      brandText.classList.add("expanded");
      const interval = setInterval(() => {
        brandText.innerText = finalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return finalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= finalText.length) {
          clearInterval(interval);
          setTimeout(encrypt, 10000); // Wait 10 seconds before encrypting
        }

        iteration += 1 / 3;
      }, 30);
    }

    function encrypt() {
      let iteration = 0;
      brandText.classList.remove("expanded");
      brandText.classList.add("initial");
      const interval = setInterval(() => {
        brandText.innerText = finalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return initialText[index] || " ";
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= finalText.length) {
          brandText.innerText = initialText;
          clearInterval(interval);
          setTimeout(decrypt, 10000); // Wait 10 seconds before decrypting again
        }

        iteration += 1 / 3;
      }, 30);
    }

    // Initialize with 'initial' class
    brandText.classList.add("initial");

    // Start the animation
    setTimeout(() => {
      decrypt();
    }, 1000);

    // Cleanup
    return () => {
      clearTimeout(decrypt as unknown as number);
      clearTimeout(encrypt as unknown as number);
    };
  }, []);

  // Handle scroll for navbar background and parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const navbar = navRef.current;
      setScrollY(window.scrollY);

      if (!navbar) return;

      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // Close mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // Get the target's position, accounting for navbar height
    const navbarHeight = 64; // This is the height of your navbar (h-16 = 64px)
    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;

    // Smooth scroll to the target
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  const scrollDown = () => {
    const aboutSection = document.querySelector("#about");
    if (!aboutSection) return;

    const navbarHeight = 64;
    const targetPosition =
      aboutSection.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Add this function to open the modal with the selected project
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Update the projects data structure
  const projects = [
    {
      title: "Taskmate",
      shortDescription:
        "Mobile app connecting home service providers with clients in the community",
      description:
        "Taskmate is an innovative mobile application designed to bridge the gap between home service providers and clients within the community. The app offers a seamless platform where users can easily find and connect with trusted professionals for various home services such as cleaning, plumbing, electrical repairs, and more. Taskmate enhances convenience and reliability for both service providers and clients, fostering a stronger and more connected community.",
      image: "/assets/taskmate-logo.jpg",
      tools: ["Flutter", "Firebase", "Dart", "Kotlin", "Git", "GitHub"],
    },
    {
      title: "Centsible",
      shortDescription:
        "Mobile app for tracking personal finances and budgeting",
      description:
        "Centsible is a mobile application for tracking personal finances, allowing users to manage their budget, track savings, and monitor expenses and bills. With user-friendly features, Centsible simplifies budgeting to help users maintain financial control and meet their savings goals effectively.",
      image: "assets/centsible-logo.jpg",
      tools: ["Flutter", "Firebase", "Dart", "Kotlin", "Git", "GitHub"],
    },
    {
      title: "Barangay Document Request System",
      shortDescription:
        "Community platform for requesting and managing barangay documents online",
      description:
        "The Barangay Document Request System is a community-focused platform that enables residents to request and manage barangay documents online. This system streamlines the document request process, making it more accessible and efficient for local residents and barangay officials.",
      image: "assets/barangay-document-request.jpg",
      tools: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "PHP",
        "MySQL",
        "Bootstrap",
        "Git",
        "GitHub",
      ],
    },
    {
      title: "Hansa Hotel Management System",
      shortDescription:
        "System for managing hotel operations including reservations and check-ins",
      description:
        "This Hotel Management System is designed to optimize hotel operations by managing reservations, check-ins, check-outs, and customer records. It enhances the efficiency of hotel staff and improves customer service by offering a centralized, and automated management tool.",
      image: "assets/hansa-hotel.jpg",
      tools: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "PHP",
        "MySQL",
        "Bootstrap",
        "Git",
        "GitHub",
      ],
    },
    {
      title: "GUFC Solane",
      shortDescription:
        "Web-based sales and inventory system for a local gas company",
      description:
        "GUFC Solane is a web-based Sales and Inventory Management System designed for a local gas company. Developed in collaboration with PUP San Juan students, the system streamlines inventory tracking, sales processing, and order management. It provides real-time stock monitoring, automated reporting, and an intuitive interface to enhance operational efficiency and minimize discrepancies in inventory and sales records.",
      image: "assets/solane.jpg",
      tools: [
        "Laravel",
        "PHP",
        "MySQL",
        "Vue.js",
        "Node.js",
        "Bootstrap",
        "Git",
        "GitHub",
      ],
    },
    {
      title: "Homease",
      shortDescription: "Web-based home service provider booking system",
      description:
        "Homease is a web-based home service provider booking platform developed for one of my clients. It connects homeowners with professional service providers for various home maintenance tasks such as plumbing, electrical work, cleaning, and more. The platform offers seamless booking, real-time availability checking, secure payments, and user reviews to ensure quality service. Homease simplifies the process of finding reliable home service providers, enhancing convenience for both customers and service professionals.",
      image: "assets/homease.jpg",
      tools: [
        "Laravel",
        "PHP",
        "MySQL",
        "Vue.js",
        "Node.js",
        "Bootstrap",
        "Git",
        "GitHub",
      ],
    },
  ];

  // Updated skills with Lucide icons
  const skills = {
    programming: [
      { name: "Java", icon: <Coffee className="text-red-500" /> },
      { name: "Python", icon: <BookOpen className="text-blue-600" /> },
      { name: "JavaScript", icon: <FileCode className="text-yellow-400" /> },
      { name: "C", icon: <FileJson className="text-gray-600" /> },
      { name: "C++", icon: <FileJson className="text-gray-500" /> },
      { name: "R Programming", icon: <FileJson className="text-blue-700" /> },
      { name: "Dart", icon: <FileJson className="text-blue-500" /> },
    ],
    frontend: [
      { name: "ReactJS", icon: <Blocks className="text-blue-400" /> },
      { name: "Angular", icon: <Blocks className="text-red-600" /> },
      { name: "HTML", icon: <FileCode className="text-orange-500" /> },
      { name: "CSS", icon: <Palette className="text-blue-500" /> },
      { name: "Tailwind", icon: <Palette className="text-cyan-500" /> },
      { name: "Bootstrap", icon: <Palette className="text-purple-500" /> },
    ],
    backend: [
      { name: "Django", icon: <BookOpen className="text-green-800" /> },
      { name: "Laravel", icon: <Server className="text-red-500" /> },
      { name: "MySQL", icon: <Database className="text-blue-600" /> },
      { name: "SQLite", icon: <Database className="text-gray-500" /> },
      { name: "Firebase", icon: <Flame className="text-yellow-500" /> },
    ],
    mobile: [
      { name: "Flutter", icon: <SmartphoneNfc className="text-blue-400" /> },
      { name: "Android", icon: <Smartphone className="text-green-500" /> },
    ],
    tools: [
      { name: "Git", icon: <GitBranch className="text-orange-600" /> },
      { name: "GitHub", icon: <GitBranch className="text-black" /> },
      {
        name: "Command Prompt",
        icon: <PanelRight className="text-gray-700" />,
      },
      { name: "PowerShell", icon: <PanelRight className="text-blue-600" /> },
      { name: "AWS", icon: <Cloud className="text-yellow-500" /> },
    ],
    media: [
      { name: "Adobe Photoshop", icon: <PenTool className="text-blue-600" /> },
      { name: "Adobe Premiere", icon: <PenTool className="text-purple-600" /> },
      {
        name: "Adobe Illustrator",
        icon: <PenTool className="text-orange-500" />,
      },
      { name: "Canva", icon: <Figma className="text-cyan-500" /> },
      { name: "Microsoft Office", icon: <Figma className="text-green-500" /> },
      { name: "Figma", icon: <Figma className="text-purple-500" /> },
    ],
  };

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // Initialize EmailJS
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.emailjs.init("zAO26tE049kwk--1M");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const ContactForm = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrorMessage("");

      try {
        // Send email to you
        await window.emailjs.send("service_4d5sfeb", "email_to_jem", {
          to_email: "jemuel.olaybar@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        });

        // Send auto-reply
        await window.emailjs.send("service_4d5sfeb", "auto_reply", {
          to_name: formData.name,
          to_email: formData.email,
          from_name: "jems_autoreply",
          from_email: "jem_autoreply@autoreply.com",
          reply_message:
            "Thank you for contacting me. I will get back to you soon.",
        });

        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        // Reset form after 8 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 8000);
      } catch (error) {
        console.error("Error sending email:", error);
        setErrorMessage(
          "Oops! There was an error sending your message. Please try again later.",
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    const isFormValid = formData.name && formData.email && formData.message;

    return (
      <div className="mt-8 max-w-md mx-auto font-montserrat">
        {isSubmitted ? (
          <div className="p-6 rounded-lg text-center border-2 border-green-500/50 bg-green-500/20">
            <div className="flex items-center justify-center mb-3">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-sm mb-3">
              Thank you for reaching out. I'll get back to you as soon as
              possible.
            </p>
            <p className="text-xs opacity-75">
              An auto-reply has been sent to your email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="p-4 mb-6 rounded-lg text-center border-2 border-red-500/50 bg-red-500/20">
                <svg
                  className="w-8 h-8 text-red-500 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="name" className="block text-left mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#f29028]/50 transition-all
                  ${isDarkMode ? "bg-[#1a1a1b]/80 border-white/20" : "bg-white/80 border-black/20"}`}
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-left mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#f29028]/50 transition-all
                  ${isDarkMode ? "bg-[#1a1a1b]/80 border-white/20" : "bg-white/80 border-black/20"}`}
                placeholder="Your email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-left mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#f29028]/50 transition-all
                  ${isDarkMode ? "bg-[#1a1a1b]/80 border-white/20" : "bg-white/80 border-black/20"}`}
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
                ${
                  isFormValid && !isSubmitting
                    ? "bg-[#f29028] hover:bg-[#f29028]/80 transform hover:-translate-y-1 hover:shadow-lg"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    );
  };

  return (
    <div
      className={`font-montserrat min-h-screen bg-gradient-to-br transition-colors duration-500
      ${isDarkMode ? "from-[#383739] to-[#1a1a1b] text-[#dad8d9]" : "from-[#fff] to-[#f8f8f8] text-[#383739]"}`}
    >
      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 backdrop-blur-md
          ${
            isDarkMode
              ? "bg-[#383739]/80 text-[#dad8d9] shadow-md shadow-black/20"
              : "bg-white/80 text-[#383739] shadow-md shadow-black/10"
          }
          ${isMenuOpen ? "h-screen bg-opacity-100" : ""}
        `}
      >
        <div className="container mx-auto h-16 px-4 flex items-center justify-between select-none">
          {/* Brand with animation */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              window.location.reload(); // Refresh the page
            }}
            className="flex items-center h-full"
          >
            <div className="w-48 text-left">
              <span
                ref={brandTextRef}
                id="brand-text"
                className={`font-bold relative inline-block whitespace-nowrap transition-all duration-300 ease leading-none
                  ${isDarkMode ? "text-white" : "text-black"}`}
              >
                JO
              </span>
            </div>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="transition-all duration-300 hover:text-[#f29028] relative px-2 py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f29028] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] md:hidden space-y-6 backdrop-blur-md bg-opacity-100">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl transition-all duration-300 hover:text-[#f29028]"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Theme Toggle - Fixed position with higher z-index */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg z-50 hover:scale-110 transition-all duration-300 ease-in-out"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-300" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600" />
        )}
      </button>

      {/* Fullscreen Header Section with Parallax */}
      <header
        ref={homeRef}
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/me.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Parallax floating elements */}
        <div
          className="absolute w-32 h-32 rounded-full bg-[#f29028]/20 blur-3xl top-1/4 left-1/4"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div
          className="absolute w-40 h-40 rounded-full bg-blue-500/20 blur-3xl bottom-1/4 right-1/4"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        ></div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            className="max-w-lg mx-auto select-none"
            initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
            animate={{ opacity: 1, y: 0 }} // Animate to visible and normal position
            transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
          >
            <motion.h2
              className="text-1xl text-white mb-2 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Hello, I'm
            </motion.h2>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              JEMUEL OLAYBAR
            </motion.h1>

            <motion.p
              className="text-1.5xl text-white opacity-90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              Web and Mobile Developer
            </motion.p>

            <motion.button
              onClick={scrollDown}
              className="flex items-center justify-center mx-auto mt-8 w-12 h-12 rounded-full 
                bg-white/20 hover:bg-white/30 text-white transition-all duration-300 animate-bounce"
              aria-label="Scroll down"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Background Section with Parallax */}
      <section
        id="about"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden select-none"
      >
        {/* Parallax background elements */}
        <div
          className="absolute w-64 h-64 rounded-full bg-[#f29028]/10 blur-3xl -left-20 top-20"
          style={{ transform: `translateY(${(scrollY - 500) * 0.1}px)` }}
        ></div>
        <div
          className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-3xl -right-20 bottom-20"
          style={{ transform: `translateY(${(scrollY - 500) * -0.05}px)` }}
        ></div>

        <div
          className="relative p-6 md:p-8 rounded-2xl border border-white/20 shadow-xl 
            hover:shadow-2xl hover:border-white/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          style={{
            transform: `translateY(${Math.max(0, (scrollY - 800) * -0.05)}px)`,
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-2">
            <Code2 className="w-6 h-6 md:w-8 md:h-8 text-[#f29028]" />
            Get to know me!
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-2">
            I'm a passionate <strong>Web and Mobile Developer</strong>,
            specializing in creating responsive, user-friendly applications that
            solve real-world problems. Check out some of my work in the Projects
            section.
          </p>

          <p className="text-base md:text-lg leading-relaxed mb-2">
            My expertise spans the full development stack, from designing
            intuitive user interfaces to implementing robust backend solutions.
            Feel free to connect with me on{" "}
            <a
              href="https://linkedin.com/in/jeeems"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f29028] font-medium hover:underline"
            >
              LinkedIn
            </a>{" "}
            or send me an email to discuss potential projects or opportunities.
          </p>

          <p className="text-base md:text-lg leading-relaxed mb-2">
            I'm open to <strong>Job</strong> opportunities, freelance projects,
            and collaborations where I can contribute my skills and expertise.
            If you have a great project idea or need help with an existing
            project, don't hesitate to reach out!
          </p>

          {/* Contact Button */}
          <div className="flex justify-center mt-6">
            <a
              href="#contact"
              className="bg-[#f29028] text-white font-medium px-6 py-3 rounded-lg shadow-md 
              transition-all duration-300 hover:bg-[#d9791d] hover:shadow-lg"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section with Parallax */}
      <section
        id="skills"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden select-none"
      >
        {/* Parallax background elements */}
        <div
          className="absolute w-72 h-72 rounded-full bg-purple-500/10 blur-3xl -right-20 top-20"
          style={{ transform: `translateY(${(scrollY - 1200) * 0.08}px)` }}
        ></div>
        <div
          className="absolute w-64 h-64 rounded-full bg-green-500/10 blur-3xl -left-10 bottom-40"
          style={{ transform: `translateY(${(scrollY - 1200) * -0.06}px)` }}
        ></div>

        <h2
          className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-2 relative"
          style={{
            transform: `translateX(${Math.max(0, (scrollY - 1300) * -0.1)}px)`,
          }}
        >
          <Languages className="w-6 h-6 md:w-8 md:h-8 text-[#f29028]" />
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <div
              key={category}
              className="p-6 rounded-xl border border-white/20 shadow-xl
                hover:shadow-2xl hover:border-white/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              style={{
                transform: `translateY(${Math.max(0, (scrollY - 1400) * -0.04 * ((index % 3) + 1))}px)`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-4 capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-full bg-[#f29028]/20 hover:bg-[#f29028]/30 transition-colors duration-300 ease-in-out cursor-default"
                  >
                    <div className="flex items-center h-8">
                      {/* Icon container - initially hidden, slides in on hover - SMALLER SIZE */}
                      <div className="flex items-center justify-center w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-300 ease-in-out pl-0 group-hover:pl-2">
                        <div className="flex-shrink-0 w-2 h-5">
                          {" "}
                          {/* Reduced from w-4 h-4 to w-3 h-3 */}
                          {skill.icon}
                        </div>
                      </div>

                      {/* Text container - fixed vertical alignment */}
                      <div className="px-3 py-1 text-sm transition-all duration-300 ease-in-out group-hover:translate-x-1 flex items-center">
                        {skill.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section with Parallax */}
      <section
        id="projects"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden select-none"
      >
        {/* Parallax background elements */}
        <div
          className="absolute w-80 h-80 rounded-full bg-[#f29028]/10 blur-3xl -left-40 top-1/4"
          style={{ transform: `translateY(${(scrollY - 2000) * 0.1}px)` }}
        ></div>
        <div
          className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl -right-40 bottom-1/4"
          style={{ transform: `translateY(${(scrollY - 2000) * -0.08}px)` }}
        ></div>

        <h2
          className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-2 relative"
          style={{
            transform: `translateX(${Math.max(0, (scrollY - 2100) * -0.1)}px)`,
          }}
        >
          <Palette className="w-6 h-6 md:w-8 md:h-8 text-[#f29028]" />
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/20 shadow-xl overflow-hidden
              hover:shadow-2xl hover:border-white/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              style={{
                transform: `translateY(${Math.max(0, (scrollY - 2200) * -0.05 * ((index % 3) + 1))}px)`,
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button
                    onClick={() => openProjectModal(project)}
                    className="text-white font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Details <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="opacity-90 mb-4">{project.shortDescription}</p>
                <button
                  onClick={() => openProjectModal(project)}
                  className="inline-flex items-center gap-2 text-[#f29028] hover:text-[#f29028]/80 hover:gap-3 transition-all"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
              ref={modalRef}
              className={`bg-gradient-to-br ${isDarkMode ? "from-[#383739] to-[#1a1a1b] text-[#dad8d9]" : "from-[#fff] to-[#f8f8f8] text-[#383739]"} 
              rounded-xl border border-white/20 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto`}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">
                  {selectedProject.title}
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#f29028]" /> Project
                    Overview
                  </h4>
                  <p className="opacity-90">{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-[#f29028]" /> Technologies
                    Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#f29028]/20 text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Contact Section with Parallax */}
      <section
        id="contact"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden select-none"
      >
        {/* Parallax background elements */}
        <div
          className="absolute w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl -right-20 top-1/4"
          style={{ transform: `translateY(${(scrollY - 2800) * 0.07}px)` }}
        ></div>
        <div
          className="absolute w-72 h-72 rounded-full bg-[#f29028]/10 blur-3xl -left-20 bottom-1/4"
          style={{ transform: `translateY(${(scrollY - 2800) * -0.06}px)` }}
        ></div>

        <div
          className="relative p-6 md:p-8 rounded-2xl border border-white/20 shadow-xl text-center
            hover:shadow-2xl hover:border-white/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          style={{
            transform: `translateY(${Math.max(0, (scrollY - 2900) * -0.05)}px)`,
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center justify-center gap-2">
            <Mail className="w-6 h-6 md:w-8 md:h-8 text-[#f29028]" />
            Get in Touch
          </h2>
          <p className="text-base md:text-lg mb-6">
            I'm always open to new opportunities and interesting projects. Feel
            free to reach out!
          </p>

          {/* Social links */}
          <div className="flex justify-center gap-4 md:gap-6">
            {/* <a 
              href="mailto:jemuel.olaybar@gmail.com" 
              className="p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg 
                hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#f29028]" />
            </a> */}
            <a
              href="https://github.com/jeeems"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg 
                hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 md:w-6 md:h-6 text-[#f29028]" />
            </a>
            <a
              href="https://linkedin.com/in/jeeems"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg 
                hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-[#f29028]" />
            </a>
          </div>

          {/* Add the contact form with isDarkMode passed as prop */}
          <ContactForm isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* Footer with Parallax */}
      <footer
        className="py-16 px-4 text-center relative overflow-hidden select-none"
        style={{
          transform: `translateY(${Math.max(0, (scrollY - 3200) * -0.02)}px)`,
        }}
      >
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#f29028]/30 to-transparent top-0 left-0"
          style={{
            transform: `scaleX(${Math.min(1, Math.max(0.3, scrollY / 3300))})`,
          }}
        ></div>
        <p className="opacity-70">
          © {new Date().getFullYear()} Jemuel Olaybar. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
