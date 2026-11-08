// ==================== Dashboard Functionality ====================

// Sample user blogs data
const userBlogs = [
    {
        id: 1,
        title: 'My First Blog Post',
        category: 'Technology',
        status: 'Published',
        views: 342,
        date: 'Nov 1, 2024'
    },
    {
        id: 2,
        title: 'Travel Tips for Beginners',
        category: 'Travel',
        status: 'Published',
        views: 187,
        date: 'Oct 28, 2024'
    },
    {
        id: 3,
        title: 'Easy Cooking Recipes',
        category: 'Food',
        status: 'Draft',
        views: 0,
        date: 'Oct 25, 2024'
    },
    {
        id: 4,
        title: 'Web Development Guide',
        category: 'Technology',
        status: 'Published',
        views: 523,
        date: 'Oct 20, 2024'
    }
];

const draftBlogs = [
    {
        id: 3,
        title: 'Easy Cooking Recipes',
        category: 'Food',
        excerpt: 'A collection of simple recipes...',
        savedDate: 'Oct 25, 2024'
    }
];

const publishedBlogs = [
    {
        id: 1,
        title: 'My First Blog Post',
        category: 'Technology',
        excerpt: 'Introduction to web development...',
        icon: '💻',
        views: 342
    },
    {
        id: 2,
        title: 'Travel Tips for Beginners',
        category: 'Travel',
        excerpt: 'Essential tips for your first trip...',
        icon: '✈️',
        views: 187
    },
    {
        id: 4,
        title: 'Web Development Guide',
        category: 'Technology',
        excerpt: 'Complete guide to modern web dev...',
        icon: '🔧',
        views: 523
    }
];

// Load user data from localStorage
function loadUserData() {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
        const user = JSON.parse(userProfile);
        document.getElementById('userName').textContent = user.firstName + ' ' + user.lastName;
        document.getElementById('userEmail').textContent = user.email;
    }
}

// Load blogs table
function loadBlogsTable() {
    const tbody = document.getElementById('blogsTableBody');
    if (!tbody) return;

    tbody.innerHTML = userBlogs.map(blog => `
        <tr>
            <td><strong>${blog.title}</strong></td>
            <td>${blog.category}</td>
            <td>
                <span class="status-badge status-${blog.status.toLowerCase()}">
                    ${blog.status}
                </span>
            </td>
            <td>${blog.views}</td>
            <td>${blog.date}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn action-edit" onclick="editBlog(${blog.id})">Edit</button>
                    <button class="action-btn action-delete" onclick="deleteBlog(${blog.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load drafts
function loadDrafts() {
    const draftsGrid = document.getElementById('draftsGrid');
    if (!draftsGrid) return;

    draftsGrid.innerHTML = draftBlogs.map(blog => `
        <div class="blog-card">
            <div class="blog-card-image">💾</div>
            <div class="blog-card-content">
                <h3>${blog.title}</h3>
                <p class="blog-card-meta">${blog.category} • ${blog.savedDate}</p>
                <p class="blog-card-excerpt">${blog.excerpt}</p>
                <div class="blog-card-footer">
                    <button class="btn btn-secondary" onclick="continueDraft(${blog.id})">Continue</button>
                    <button class="action-btn action-delete" onclick="deleteDraft(${blog.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load published blogs
function loadPublishedBlogs() {
    const publishedGrid = document.getElementById('publishedGrid');
    if (!publishedGrid) return;

    publishedGrid.innerHTML = publishedBlogs.map(blog => `
        <div class="blog-card">
            <div class="blog-card-image">${blog.icon}</div>
            <div class="blog-card-content">
                <h3>${blog.title}</h3>
                <div class="blog-card-meta">
                    <span class="blog-category">${blog.category}</span>
                    <span>👁️ ${blog.views}</span>
                </div>
                <p class="blog-card-excerpt">${blog.excerpt}</p>
                <div class="blog-card-footer">
                    <a href="#" class="read-more">View →</a>
                    <button class="action-btn action-edit" onclick="editBlog(${blog.id})">Edit</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup sidebar navigation
function setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.dashboard-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const sectionId = link.getAttribute('data-section');
            const sectionElement = document.getElementById(sectionId + '-section');

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Remove active class from all links
            sidebarLinks.forEach(l => {
                l.classList.remove('active');
            });

            // Show selected section and mark link as active
            if (sectionElement) {
                sectionElement.classList.add('active');
                link.classList.add('active');
            }
        });
    });
}

// Blog actions
function editBlog(blogId) {
    console.log('Editing blog:', blogId);
    // In a real app, redirect to edit blog page
    alert('Edit blog ' + blogId + ' - Feature coming soon!');
}

function deleteBlog(blogId) {
    if (confirm('Are you sure you want to delete this blog?')) {
        const index = userBlogs.findIndex(b => b.id === blogId);
        if (index > -1) {
            userBlogs.splice(index, 1);
            loadBlogsTable();
            alert('Blog deleted successfully!');
        }
    }
}

function continueDraft(blogId) {
    console.log('Continuing draft:', blogId);
    // Redirect to create blog page with draft ID
    window.location.href = 'create-blog.html?draft=' + blogId;
}

function deleteDraft(blogId) {
    if (confirm('Are you sure you want to delete this draft?')) {
        const index = draftBlogs.findIndex(b => b.id === blogId);
        if (index > -1) {
            draftBlogs.splice(index, 1);
            loadDrafts();
            alert('Draft deleted successfully!');
        }
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Setup settings form
function setupSettingsForm() {
    const settingsForm = document.getElementById('settingsForm');
    if (!settingsForm) return;

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('settingsName').value;
        const email = document.getElementById('settingsEmail').value;
        const bio = document.getElementById('settingsBio').value;
        const category = document.getElementById('settingsCategory').value;

        // Save settings to localStorage
        const settings = {
            name: name,
            email: email,
            bio: bio,
            favoriteCategory: category,
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem('userSettings', JSON.stringify(settings));

        // Show success message
        alert('Settings saved successfully!');
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }

    loadUserData();
    loadBlogsTable();
    loadDrafts();
    loadPublishedBlogs();
    setupSidebarNavigation();
    setupSettingsForm();

    // Load settings if available
    const userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
        const settings = JSON.parse(userSettings);
        document.getElementById('settingsName').value = settings.name || '';
        document.getElementById('settingsEmail').value = settings.email || '';
        document.getElementById('settingsBio').value = settings.bio || '';
        document.getElementById('settingsCategory').value = settings.favoriteCategory || '';
    }
});