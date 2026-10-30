/* ==========================================
   BRIGHTFUTURE ACADEMY - MODERN CORE SCRIPTS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Handler
    const header = document.querySelector('header');
    const announcementBar = document.querySelector('.announcement-bar');
    const stickyThreshold = announcementBar ? announcementBar.offsetHeight : 0;

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyThreshold) {
            header.classList.add('sticky');
            if (announcementBar) {
                document.body.style.paddingTop = `${header.offsetHeight}px`;
            }
        } else {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0';
        }
    });

    // 2. Active Navigation Link Highlighting
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (pageName === linkHref || (pageName === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Mobile Hamburger Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Toggle hamburger icon between bars and times (close)
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navLinksContainer.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        // Close mobile menu when a nav-link is clicked
        const links = navLinksContainer.querySelectorAll('.nav-link');
        links.forEach(l => {
            l.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // 4. Slide-down Search Overlay Toggle
    const searchTrigger = document.querySelector('.search-trigger');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');

    if (searchTrigger && searchOverlay && searchClose) {
        searchTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('active');
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 300);
        });

        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        // Close on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    // 5. Course Category Filtering
    const filterPills = document.querySelectorAll('.filter-pill');
    const courseCards = document.querySelectorAll('.course-card');

    if (filterPills.length > 0 && courseCards.length > 0) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                // Remove active from all pills
                filterPills.forEach(p => p.classList.remove('active'));
                // Add active to current pill
                pill.classList.add('active');

                const selectedCategory = pill.getAttribute('data-category');

                courseCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.style.display = 'flex';
                        // Trigger simple fade-in micro-animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Horizontal Pill Filters Scroll Button navigation
    const prevBtn = document.querySelector('.filter-nav-btn.prev');
    const nextBtn = document.querySelector('.filter-nav-btn.next');
    const pillsContainer = document.querySelector('.filter-pills-container');

    if (prevBtn && nextBtn && pillsContainer) {
        prevBtn.addEventListener('click', () => {
            pillsContainer.scrollLeft -= 150;
        });

        nextBtn.addEventListener('click', () => {
            pillsContainer.scrollLeft += 150;
        });
    }

    // 7. Course Detail Modal Database & Engine
    const coursesData = {
        'uiux': {
            title: 'UI/UX Design Masterclass',
            badge: 'Beginner',
            badgeClass: 'badge-beginner',
            price: '$450',
            duration: '8 Month',
            rating: '5.0 (1.5k Learners)',
            img: 'asset/course_uiux.png',
            desc: 'Master visual layouts, typography, prototype fidelity, high-converting customer journeys, and modern collaborative design frameworks like Figma. Start designing beautiful interfaces from day zero.',
            syllabus: [
                'Introduction to Visual Design Theory',
                'Wireframing & Grid Alignment Systems',
                'High-Fidelity UI Prototyping in Figma',
                'User Research & Usability Diagnostics',
                'Mobile App Responsive UX Architecture',
                'Portfolio Project & Presentation Bootcamp'
            ]
        },
        'mern': {
            title: 'MERN Stack Web Development',
            badge: 'Intermediate',
            badgeClass: 'badge-intermediate',
            price: '$550',
            duration: '7 Month',
            rating: '5.0 (8.5k Learners)',
            img: 'asset/course_mern.png',
            desc: 'Build highly scalable, dynamic single-page web applications from scratch. Dive deep into database modeling with MongoDB, backend design with Express and Node.js, and client rendering with React.',
            syllabus: [
                'JavaScript (ES6+) & Asynchronous Syntax',
                'React.js Component Architecture & State Management',
                'RESTful APIs Development with Express',
                'MongoDB Aggregation & Schema Modeling',
                'JWT Secure User Authentication Systems',
                'Deploying Multi-tier Web Projects to AWS'
            ]
        },
        'datascience': {
            title: 'Data Science & Predictive AI',
            badge: 'Advanced',
            badgeClass: 'badge-advanced',
            price: '$650',
            duration: '7 Month',
            rating: '5.0 (4.5k Learners)',
            img: 'asset/course_datascience.png',
            desc: 'Unlock predictive analytics, regression metrics, and machine learning neural models. Learn to clean complex data lakes, build interactive dashboards, and design enterprise AI solutions.',
            syllabus: [
                'Python Programming for Data Scientists',
                'Statistical Distributions & Hypothesis Testing',
                'Pandas & NumPy Advanced Matrix Formulations',
                'Data Visualizations with Seaborn & Matplotlib',
                'Machine Learning Scikit-Learn Algorithms',
                'Deep Learning Concepts & Neural Networks'
            ]
        },
        'python': {
            title: 'Python Development Core',
            badge: 'Beginner',
            badgeClass: 'badge-beginner',
            price: '$400',
            duration: '6 Month',
            rating: '4.9 (3.2k Learners)',
            img: 'asset/course_datascience.png',
            desc: 'Learn the most versatile programming language. From syntax fundamentals and object-oriented programming (OOP) to web scraping, automation scripts, and database engines integration.',
            syllabus: [
                'Python Fundamentals & Syntax Systems',
                'Object-Oriented Programming & Methods',
                'File I/O & Automated Task Systems',
                'Web Scraping with Beautiful Soup',
                'SQLite & PostgreSQL Integrations',
                'Framework Foundations (Django / Flask)'
            ]
        },
        'marketing': {
            title: 'Digital Marketing & Growth',
            badge: 'Beginner',
            badgeClass: 'badge-beginner',
            price: '$380',
            duration: '6 Month',
            rating: '4.8 (2.8k Learners)',
            img: 'asset/course_uiux.png',
            desc: 'Learn how to generate traffic, build online presence, and optimize advertising budgets. Covers Search Engine Optimization (SEO), Pay-Per-Click (PPC), social channels growth, and Analytics.',
            syllabus: [
                'SEO On-Page & Technical Formulations',
                'Google Ads PPC Campaigns Strategy',
                'Social Media Marketing & Brand Presence',
                'Email Campaigns & Copywriting Dynamics',
                'Google Analytics 4 & Funnel Tracking',
                'Growth Hacking & Brand Conversion Rate Optimization'
            ]
        },
        'cybersecurity': {
            title: 'Cybersecurity & Ethical Hacking',
            badge: 'Advanced',
            badgeClass: 'badge-advanced',
            price: '$680',
            duration: '8 Month',
            rating: '4.9 (1.9k Learners)',
            img: 'asset/course_mern.png',
            desc: 'Protect enterprise infrastructure, execute network penetration diagnostics, and discover web vulnerabilities. Understand security protocols, firewalls, threat defense mechanisms, and recovery.',
            syllabus: [
                'Linux Command Line & Networking Protocols',
                'Ethical Hacking & Penetration Frameworks',
                'Vulnerability Assessments & Remediation',
                'Web Application Security & OWASP Top 10',
                'Cryptography & Secure Shell Protocols',
                'Incident Response & digital forensics basics'
            ]
        }
    };

    // Modal Trigger Setup
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');

    if (modalOverlay && modalClose) {
        // Find all triggers
        document.body.addEventListener('click', (e) => {
            const trigger = e.target.closest('.learn-more-btn') || e.target.closest('.course-btn');
            if (trigger) {
                const courseId = trigger.getAttribute('data-course');
                const data = coursesData[courseId];

                if (data) {
                    e.preventDefault();
                    
                    // Fill modal details
                    const modalImg = modalOverlay.querySelector('.modal-header-img img');
                    const modalBadge = modalOverlay.querySelector('.modal-badge-wrapper .badge');
                    const modalTitle = modalOverlay.querySelector('.modal-title');
                    const modalMetaTime = modalOverlay.querySelector('.modal-meta .duration span');
                    const modalMetaRate = modalOverlay.querySelector('.modal-meta .rating span');
                    const modalDesc = modalOverlay.querySelector('.modal-desc');
                    const modalSyllabus = modalOverlay.querySelector('.modal-syllabus-list');
                    const modalPrice = modalOverlay.querySelector('.modal-price');

                    if (modalImg) modalImg.src = data.img;
                    if (modalBadge) {
                        modalBadge.textContent = data.badge;
                        modalBadge.className = `badge ${data.badgeClass}`;
                    }
                    if (modalTitle) modalTitle.textContent = data.title;
                    if (modalMetaTime) modalMetaTime.innerHTML = `<i class="far fa-clock"></i> ${data.duration}`;
                    if (modalMetaRate) modalMetaRate.innerHTML = `<i class="fas fa-star"></i> ${data.rating}`;
                    if (modalDesc) modalDesc.textContent = data.desc;
                    if (modalPrice) modalPrice.textContent = data.price;

                    // Build syllabus list items
                    if (modalSyllabus) {
                        modalSyllabus.innerHTML = '';
                        data.syllabus.forEach(item => {
                            const li = document.createElement('li');
                            li.className = 'modal-syllabus-item';
                            li.innerHTML = `<i class="fas fa-check-circle"></i> ${item}`;
                            modalSyllabus.appendChild(li);
                        });
                    }

                    // Open modal
                    modalOverlay.classList.add('active');
                }
            }
        });

        // Close Modal
        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // 8. FAQ Accordion Toggle Behavior
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.faq-content');
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                const c = i.querySelector('.faq-content');
                if (c) c.style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = `${content.scrollHeight + 40}px`; // Add padding
            }
        });
    });

    // 9. Application and Contact Form Interceptions & Visual Toast Alert
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation check
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');

            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (!isValid) {
                showToast('Please fill out all required fields.', 'error');
                return;
            }

            // Successfully processed
            showToast('Congratulations! Your application has been submitted successfully. Our counsellor will contact you within 24 hours.', 'success');
            form.reset();
        });
    });

    // Elegant Toast Notification System
    function showToast(message, type = 'success') {
        // Check if toast container exists
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            // Inject Toast Styles dynamically
            const styles = document.createElement('style');
            styles.textContent = `
                .toast-container {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    z-index: 5000;
                }
                .toast-message {
                    background-color: var(--primary-color);
                    color: var(--text-light);
                    padding: 16px 28px;
                    border-radius: var(--radius-btn);
                    font-size: 0.92rem;
                    font-weight: 500;
                    box-shadow: var(--shadow-heavy);
                    transform: translateY(20px);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-left: 5px solid var(--secondary-color);
                }
                .toast-message.toast-error {
                    background-color: #991b1b;
                    border-left-color: #f87171;
                }
                .toast-message.show {
                    transform: translateY(0);
                    opacity: 1;
                }
            `;
            document.head.appendChild(styles);
            document.body.appendChild(toastContainer);
        }

        // Create the toast
        const toast = document.createElement('div');
        toast.className = `toast-message ${type === 'error' ? 'toast-error' : ''}`;
        const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Slide up
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 5000);
    }
});
