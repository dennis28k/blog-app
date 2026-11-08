# BlogHub - Responsive Blog Application

A complete, modern blog application built with vanilla HTML, CSS, and JavaScript.

## 📁 Project Structure

```
blog-app/
├── index.html           # Home page with featured blogs and categories
├── login.html           # User login page
├── register.html        # User registration page
├── dashboard.html       # User dashboard with blog management
├── create-blog.html     # Blog creation and editing page
├── style.css            # Main stylesheet (fully responsive)
├── script.js            # Home page JavaScript
├── auth.js              # Authentication & form validation
├── dashboard.js         # Dashboard functionality
└── create-blog.js       # Blog creation & preview functionality
```

## 🎨 Features

### Home Page (index.html)
- ✅ Sticky navigation bar with responsive hamburger menu
- ✅ Hero section with call-to-action
- ✅ Featured blogs grid (6 sample blogs)
- ✅ Categories showcase (Technology, Travel, Food, Health)
- ✅ Call-to-action section
- ✅ Footer with links and social media

### Authentication
- ✅ Login page with email/password validation
- ✅ Register page with password strength indicator
- ✅ Form validation with error messages
- ✅ Password visibility toggle
- ✅ Terms and conditions agreement
- ✅ Social media login buttons (UI ready)

### Dashboard
- ✅ User profile section
- ✅ Sidebar navigation with 5 sections
- ✅ My Blogs table view with edit/delete actions
- ✅ Drafts management
- ✅ Published blogs showcase
- ✅ Analytics cards (views, likes, comments, total blogs)
- ✅ Account settings with profile management
- ✅ Logout functionality

### Create Blog
- ✅ Blog title, category, and tags input
- ✅ Featured image upload with drag-and-drop
- ✅ Excerpt textarea with character counter
- ✅ Rich content editor with formatting toolbar
- ✅ SEO meta description field
- ✅ Live preview sidebar
- ✅ Reading time calculator
- ✅ Save as draft functionality
- ✅ Preview modal before publishing
- ✅ Publish button with validation

## 📱 Responsive Design

- ✅ **Desktop** (1200px+) - Full layout with sidebar
- ✅ **Tablet** (768px-1024px) - Optimized grid layouts
- ✅ **Mobile** (480px-767px) - Mobile menu, single column layouts
- ✅ **Small Mobile** (<480px) - Compact UI elements

## 🎯 Color Scheme

```css
Primary: #6366f1 (Indigo)
Secondary: #ec4899 (Pink)
Dark Background: #1f2937
Light Background: #f9fafb
Text Dark: #111827
Text Light: #6b7280
Success: #10b981
Error: #ef4444
```

## 🚀 How to Use

### Local Storage Features
The app uses browser localStorage to simulate backend functionality:
- User authentication data
- Blog posts and drafts
- User profile settings
- Dashboard analytics

### User Flow

1. **Home Page** - Browse blogs and categories
2. **Register** - Create new account
3. **Login** - Sign in with email/password
4. **Dashboard** - View and manage your blogs
5. **Create Blog** - Write and publish new blog posts

### Testing the App

1. Open `index.html` in a browser
2. Click "Sign Up" or "Get Started"
3. Fill registration form and submit
4. You'll be redirected to dashboard
5. Use "Create Blog" or "New Blog" button
6. Write your blog and publish

## 📝 Forms & Validation

### Login Form
- Email validation (format check)
- Password minimum 6 characters
- Remember me checkbox

### Register Form
- First & Last name (min 2 characters)
- Valid email format
- Unique username (min 3 characters)
- Password strength indicator
- Password confirmation
- Terms acceptance required

### Blog Creation
- Title (max 100 characters)
- Category selection required
- Optional tags (comma-separated)
- Featured image upload (max 5MB)
- Excerpt (max 150 characters)
- Content minimum required
- SEO meta description (max 160 characters)

## 💡 Key JavaScript Features

- **Mobile Menu Toggle** - Hamburger menu for responsive navigation
- **Password Strength Checker** - Real-time password strength feedback
- **Character Counter** - Live character count for text fields
- **Reading Time Calculator** - Estimates blog reading time
- **Live Preview** - Real-time blog preview while editing
- **Image Upload** - Drag-and-drop and click-to-upload support
- **Form Validation** - Comprehensive client-side validation
- **LocalStorage Management** - Save and retrieve user data
- **Modal System** - Preview modal with close functionality

## 🔧 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... more variables ... */
}
```

### Fonts
Default: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
Change in body CSS rule

### Sample Data
Update arrays in `script.js`, `dashboard.js`, and `create-blog.js`

## 📌 Notes

- Uses localStorage (browser storage) - data persists across sessions
- No backend required - fully client-side
- Forms are validated before submission
- Add your own backend API integration
- Images are stored as base64 in localStorage

## 🎓 Learning Resources

Good for learning:
- Responsive CSS Grid and Flexbox
- Form validation techniques
- Local storage usage
- DOM manipulation with vanilla JS
- Event handling and delegation
- Modal and navigation patterns

---

**Created:** November 2024
**Version:** 1.0
**Status:** Production Ready ✨
