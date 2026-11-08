// ==================== Create Blog Functionality ====================

// Calculate reading time based on word count
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return Math.max(1, minutes);
}

// Update character counts
function setupCharacterCounters() {
    const titleInput = document.getElementById('blogTitle');
    const excerptInput = document.getElementById('blogExcerpt');
    const contentInput = document.getElementById('blogContent');
    const metaInput = document.getElementById('blogMeta');

    if (titleInput) {
        titleInput.addEventListener('input', () => {
            document.getElementById('titleCount').textContent = titleInput.value.length;
            updatePreview();
        });
    }

    if (excerptInput) {
        excerptInput.addEventListener('input', () => {
            document.getElementById('excerptCount').textContent = excerptInput.value.length;
            updatePreview();
        });
    }

    if (contentInput) {
        contentInput.addEventListener('input', () => {
            const contentLength = contentInput.value.length;
            document.getElementById('contentCount').textContent = contentLength;
            const readingTime = calculateReadingTime(contentInput.value);
            document.getElementById('readingTime').textContent = `Estimated reading time: ${readingTime} minute${readingTime > 1 ? 's' : ''}`;
            document.getElementById('previewReadTime').textContent = readingTime + ' min read';
            updatePreview();
        });
    }

    if (metaInput) {
        metaInput.addEventListener('input', () => {
            document.getElementById('metaCount').textContent = metaInput.value.length;
        });
    }
}

// Update live preview
function updatePreview() {
    const title = document.getElementById('blogTitle').value || 'Your title will appear here';
    const excerpt = document.getElementById('blogExcerpt').value || 'Your excerpt will appear here';
    const category = document.getElementById('blogCategory').value || 'Category';
    const content = document.getElementById('blogContent').value || 'Start typing to see your content preview here...';

    document.getElementById('previewTitle').textContent = title;
    document.getElementById('previewExcerpt').textContent = excerpt;
    document.getElementById('previewCategory').textContent = category;
    document.getElementById('contentPreview').textContent = content.substring(0, 200) + (content.length > 200 ? '...' : '');
}

// Setup image upload
function setupImageUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const blogImage = document.getElementById('blogImage');
    const imagePreview = document.getElementById('imagePreview');

    if (!uploadArea || !blogImage) return;

    // Click to upload
    uploadArea.addEventListener('click', () => {
        blogImage.click();
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageFile(files[0]);
        }
    });

    // File input change
    blogImage.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageFile(e.target.files[0]);
        }
    });
}

// Handle image file
function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Blog featured image">`;
        document.getElementById('uploadArea').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// Setup form submission
function setupCreateBlogForm() {
    const createBlogForm = document.getElementById('createBlogForm');
    if (!createBlogForm) return;

    createBlogForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('blogTitle').value.trim();
        const category = document.getElementById('blogCategory').value;
        const excerpt = document.getElementById('blogExcerpt').value.trim();
        const content = document.getElementById('blogContent').value.trim();
        const tags = document.getElementById('blogTags').value;

        // Validation
        if (!title) {
            alert('Please enter a blog title');
            return;
        }

        if (!category) {
            alert('Please select a category');
            return;
        }

        if (!excerpt) {
            alert('Please enter an excerpt');
            return;
        }

        if (!content) {
            alert('Please write blog content');
            return;
        }

        // Create blog object
        const newBlog = {
            id: Date.now(),
            title: title,
            category: category,
            excerpt: excerpt,
            content: content,
            tags: tags.split(',').map(t => t.trim()).filter(t => t),
            status: 'Published',
            createdAt: new Date().toISOString(),
            views: 0
        };

        // Save to localStorage (in a real app, this would go to a server)
        const userBlogs = JSON.parse(localStorage.getItem('userBlogs')) || [];
        userBlogs.push(newBlog);
        localStorage.setItem('userBlogs', JSON.stringify(userBlogs));

        // Show success message
        alert('Blog published successfully! Redirecting to dashboard...');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

// Setup save draft button
function setupSaveDraftButton() {
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (!saveDraftBtn) return;

    saveDraftBtn.addEventListener('click', () => {
        const title = document.getElementById('blogTitle').value.trim();
        const category = document.getElementById('blogCategory').value;
        const excerpt = document.getElementById('blogExcerpt').value.trim();
        const content = document.getElementById('blogContent').value.trim();

        if (!title || !content) {
            alert('Please enter a title and content to save as draft');
            return;
        }

        const draft = {
            id: Date.now(),
            title: title,
            category: category,
            excerpt: excerpt,
            content: content,
            status: 'Draft',
            savedAt: new Date().toISOString()
        };

        const drafts = JSON.parse(localStorage.getItem('userDrafts')) || [];
        drafts.push(draft);
        localStorage.setItem('userDrafts', JSON.stringify(drafts));

        alert('Draft saved successfully!');
    });
}

// Setup preview button
function setupPreviewButton() {
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');

    if (!previewBtn || !previewModal) return;

    previewBtn.addEventListener('click', () => {
        const title = document.getElementById('blogTitle').value || 'Blog Title';
        const excerpt = document.getElementById('blogExcerpt').value || 'Blog excerpt';
        const category = document.getElementById('blogCategory').value || 'Category';
        const content = document.getElementById('blogContent').value || 'Blog content';
        const readingTime = calculateReadingTime(content);

        const previewHTML = `
            <div style="max-width: 700px; margin: 0 auto;">
                <div style="margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); height: 300px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 4rem;">
                        📸
                    </div>
                </div>
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">${title}</h1>
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: #6b7280;">
                    <span style="background-color: #f3f4f6; padding: 0.3rem 0.75rem; border-radius: 12px;">${category}</span>
                    <span>⏱️ ${readingTime} min read</span>
                </div>
                <p style="font-size: 1.1rem; color: #6b7280; margin-bottom: 2rem; line-height: 1.8;">${excerpt}</p>
                <hr style="margin: 2rem 0;">
                <div style="line-height: 1.8; white-space: pre-wrap; font-size: 1rem;">
                    ${content}
                </div>
            </div>
        `;

        document.getElementById('previewModalBody').innerHTML = previewHTML;
        previewModal.classList.add('active');
    });
}

// Close preview modal
function closePreviewModal() {
    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
        previewModal.classList.remove('active');
    }
}

// Text formatting (basic implementation)
function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('blogContent').focus();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    setupCharacterCounters();
    setupImageUpload();
    setupCreateBlogForm();
    setupSaveDraftButton();
    setupPreviewButton();

    // Initial preview update
    updatePreview();

    // Load draft if editing
    const params = new URLSearchParams(window.location.search);
    const draftId = params.get('draft');
    if (draftId) {
        const drafts = JSON.parse(localStorage.getItem('userDrafts')) || [];
        const draft = drafts.find(d => d.id == draftId);
        if (draft) {
            document.getElementById('blogTitle').value = draft.title;
            document.getElementById('blogCategory').value = draft.category;
            document.getElementById('blogExcerpt').value = draft.excerpt;
            document.getElementById('blogContent').value = draft.content;
            updatePreview();
        }
    }
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const previewModal = document.getElementById('previewModal');
    if (previewModal && e.target === previewModal) {
        previewModal.classList.remove('active');
    }
});