// Force page to load at top on refresh
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Also scroll to top on page load
window.addEventListener('load', function() {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});


// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // ANIMATED COUNTERS FOR STATS
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ============================================
    // PROJECT FILTERING
    // ============================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // TYPING EFFECT
    // ============================================
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 500);
    }

    // ============================================
    // CURSOR EFFECT (Optional)
    // ============================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #ff0000;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#ff0000';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// PRELOADER (Optional)
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// FETCH LATEST BLOG POSTS FROM JSON
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.getElementById('blogGrid');
    
    console.log('blogGrid element:', blogGrid); // DEBUG LINE
    
    if (blogGrid) {
        console.log('blogGrid found, fetching posts...'); // DEBUG LINE
        fetchBlogPosts();
    } else {
        console.error('blogGrid element not found!'); // DEBUG LINE
    }
    
    async function fetchBlogPosts() {
        console.log('fetchBlogPosts started'); // DEBUG LINE
        try {
            console.log('Fetching blogs.json...'); // DEBUG LINE
            const response = await fetch('blogs.json');
            console.log('Response status:', response.status); // DEBUG LINE
            
            const data = await response.json();
            console.log('Data loaded:', data); // DEBUG LINE
            
            const posts = data.blogs.slice(0, 3);
            
            if (posts.length === 0) {
                blogGrid.innerHTML = '<p class="blog-empty">No posts available yet.</p>';
                return;
            }
            
            let blogHTML = '';
            
            posts.forEach(post => {
                const date = new Date(post.date);
                const formattedDate = date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                });
                
                blogHTML += `
                    <div class="blog-card">
                        <div class="blog-meta">
                            <span class="blog-category">${post.category}</span>
                            <span class="blog-date-time">${formattedDate} • ${post.readTime} min read</span>
                        </div>
                        <h3 class="blog-title">
                            <a href="${post.url}" target="_blank">${post.title}</a>
                        </h3>
                        <p class="blog-excerpt">${post.description}</p>
                        <a href="${post.url}" target="_blank" class="blog-readmore">Read More →</a>
                    </div>
                `;
            });
            
            blogGrid.innerHTML = blogHTML;
            console.log('Blogs rendered successfully'); // DEBUG LINE
            
        } catch (error) {
            console.error('Error loading blog posts:', error);
            blogGrid.innerHTML = '<p class="blog-empty">Unable to load posts. <a href="https://blog.r3d-z3e.me" target="_blank" style="color: var(--primary-red);">Visit blog →</a></p>';
        }
    }
});
