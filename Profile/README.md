# Personal Profile Website

A modern, minimal, and responsive personal website with a dark theme and smooth animations.

## Features

- 🌙 Dark theme with gradient backgrounds
- 📱 Fully responsive design
- ✨ Smooth hover animations and transitions
- 🎨 Neon blue and purple accent colors
- 🔗 Social media integration with FontAwesome icons
- 🎭 Floating particles background effect
- ⌨️ Keyboard navigation support
- 🖼️ Automatic fallback for missing profile picture

## Customization

### 1. Personal Information
Edit `index.html` and update:
- `<title>Your Name - Personal Profile</title>` - Page title
- `<h1 class="name">Your Name</h1>` - Your actual name
- `<p class="bio">...</p>` - Your bio/description

### 2. Profile Picture
- Add your profile picture as `profile-picture.jpg` in the main folder
- Or update the `src` attribute in the HTML to match your image filename
- Recommended size: 300x300 pixels or higher

### 3. Social Media Links
Update the `href` attributes in `index.html` for each social platform:
```html
<a href="https://github.com/yourusername" class="social-card github" target="_blank">
```
Replace `yourusername` with your actual usernames for each platform.

### 4. Colors and Styling
Edit `style.css` to customize:
- Background gradients
- Accent colors
- Font sizes
- Spacing and layout

### 5. Social Media Platforms
To add or remove social platforms:
1. Find the social media section in `index.html`
2. Copy an existing social card and modify the:
   - `href` URL
   - CSS class name
   - FontAwesome icon class
   - Display text
3. Add corresponding hover styles in `style.css`

## File Structure
```
Profile/
├── index.html              # Main HTML file
├── style.css              # Styles and animations
├── script.js              # Interactive functionality
├── profile-picture.jpg    # Your profile picture (add this)
└── README.md             # This file
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## FontAwesome Icons
The website uses FontAwesome 6.4.0 for social media icons. Available icons include:
- GitHub: `fab fa-github`
- Instagram: `fab fa-instagram`
- Facebook: `fab fa-facebook-f`
- Telegram: `fab fa-telegram-plane`
- Steam: `fab fa-steam`
- Spotify: `fab fa-spotify`
- Epic Games: `fas fa-gamepad`
- Twitter/X: `fab fa-twitter`
- Reddit: `fab fa-reddit-alien`
- Twitch: `fab fa-twitch`

## Deployment
You can host this website on:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

Simply upload all files to your hosting provider's web directory.

## License
Free to use and modify for personal projects.

---

**Tip:** Open `index.html` in your browser to preview the website locally!
