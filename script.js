// ==================== Navigation Menu Toggle ==================== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ==================== Sample Blog Data ==================== 
const sampleBlogs = [
    {
        id: 1,
        title: 'Getting Started with JavaScript',
        author: 'John Doe',
        date: 'Nov 5, 2024',
        category: 'Technology',
        excerpt: 'Learn the fundamentals of JavaScript and start your coding journey today.',
        icon: '💻'
    },
    {
        id: 2,
        title: 'Top 10 Travel Destinations',
        author: 'Jane Smith',
        date: 'Nov 4, 2024',
        category: 'Travel',
        excerpt: 'Explore the most beautiful places around the world that you must visit.',
        icon: '🌍'
    },
    {
        id: 3,
        title: 'Easy Recipes for Beginners',
        author: 'Chef Mike',
        date: 'Nov 3, 2024',
        category: 'Food',
        excerpt: 'Simple and delicious recipes that anyone can make at home.',
        icon: '🍳'
    },
    {
        id: 4,
        title: 'Fitness Tips for Busy People',
        author: 'Alex Johnson',
        date: 'Nov 2, 2024',
        category: 'Health',
        excerpt: 'Stay fit and healthy even with a busy lifestyle with these quick tips.',
        icon: '🏃'
    },
    {
        id: 5,
        title: 'Web Development Best Practices',
        author: 'Sarah Davis',
        date: 'Nov 1, 2024',
        category: 'Technology',
        excerpt: 'Master the essential practices for building modern websites.',
        icon: '🔧'
    },
    {
        id: 6,
        title: 'Healthy Eating Guide',
        author: 'Dr. Lisa',
        date: 'Oct 31, 2024',
        category: 'Health',
        excerpt: 'A complete guide to eating healthy and maintaining a balanced diet.',
        icon: '🥗'
    }
];

// ==================== Load Blog Cards ==================== 
function loadBlogCards() {
    const blogsGrid = document.getElementById('blogsGrid');
    if (!blogsGrid) return;

    blogsGrid.innerHTML = sampleBlogs.map(blog => `
        <div class="blog-card" onclick="viewBlog(${blog.id})">
            <div class="blog-card-image">${blog.icon}</div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="blog-category">${blog.category}</span>
                    <span>${blog.date}</span>
                </div>
                <h3>${blog.title}</h3>
                <p class="blog-card-excerpt">${blog.excerpt}</p>
                <div class="blog-card-footer">
                    <span style="color: var(--text-light); font-size: 0.9rem;">By ${blog.author}</span>
                    <a href="#" class="read-more">Read More →</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== Navigation Active Link ==================== 
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==================== Utility Functions ==================== 
function viewBlog(blogId) {
    console.log('Viewing blog:', blogId);
    // In a real app, this would navigate to a blog detail page
    alert('Blog ' + blogId + ' - Feature coming soon!');
}

// ==================== Initialize on Page Load ==================== 
document.addEventListener('DOMContentLoaded', () => {
    loadBlogCards();
    setActiveNavLink();
});