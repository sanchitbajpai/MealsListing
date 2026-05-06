# 🍽️ Meals App

A modern, responsive recipe application that fetches meals from an API, displays them in a beautiful grid, and allows users to view detailed recipes with ingredients and instructions.

## ✨ Features

### Core Features
- ✅ **Meals Grid** - Display meals in a responsive grid layout (1-4 columns based on screen size)
- ✅ **Search Functionality** - Search meals by name or category in real-time
- ✅ **Modal Details** - Click any meal to view full recipe with ingredients and instructions
- ✅ **Loading States** - Skeleton loaders and proper loading indicators
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

### Enhanced Features
- ⭐ **Favorite Meals** - Save your favorite meals to localStorage
- 🌙 **Dark Mode** - Toggle between light and dark themes with persistent storage
- 🧪 **Ingredients List** - Beautifully formatted ingredient list with measurements
- 🎥 **YouTube Links** - Direct links to recipe videos on YouTube
- 🎨 **Improved UX** - Heart icons for quick favoriting, smooth animations, and better spacing
- ♿ **Accessibility** - Semantic HTML, keyboard shortcuts (ESC to close modal), ARIA-friendly

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Tailwind CSS for styling and dark mode support
- **JavaScript (Vanilla)** - No frameworks, pure ES6+
- **API** - Free Meals API (https://api.freeapi.app/api/v1/public/meals)
- **Storage** - LocalStorage for favorites and theme preference

## 📂 Project Structure

```
MealsListing/
├── index.html      # Main HTML file with UI structure
├── app.js          # JavaScript logic and functionality
├── README.md       # Documentation (this file)
└── .gitignore      # Git ignore file
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanchitbajpai/MealsListing.git
   cd MealsListing
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```

3. **Visit**
   - Local: `http://localhost:8000`

## 📖 How to Use

### Browsing Meals
1. The app loads and displays a grid of meals automatically
2. Hover over cards to see animations
3. Click the heart icon (🤍/❤️) to add/remove from favorites

### Searching
- Type in the search box to find meals by name or category
- Results update in real-time
- Clear the search to see all meals again

### Viewing Recipe Details
1. Click on any meal card to open the modal
2. View the full recipe with:
   - Meal image
   - Category information
   - Complete ingredient list with measurements
   - Step-by-step instructions
   - YouTube link (if available)
3. Click the star icon to favorite from the modal
4. Press ESC or click ❌ to close

### Favorites
- Click the ⭐ button in the header to view only favorited meals
- Favorites persist across sessions (saved to localStorage)
- Click again to return to all meals

### Dark Mode
- Click the theme toggle (🌙/☀️) in the header
- Your preference is saved automatically

## 🎨 Customization

### Colors
Edit the Tailwind CSS classes in `index.html` and `app.js`:
```html
<!-- Light mode background -->
<body class="bg-gray-100">

<!-- Dark mode background -->
<body class="bg-gray-100 dark:bg-gray-900">
```

### API Endpoint
If using a different API, modify in `app.js`:
```javascript
const API_URL = "https://api.freeapi.app/api/v1/public/meals";
```

## 🔌 API Response Structure

```json
{
  "data": {
    "data": [
      {
        "id": 1,
        "name": "Pasta Carbonara",
        "category": "Italian",
        "thumbnail": "https://...",
        "instructions": "...",
        "ingredient1": "Pasta",
        "measure1": "300g",
        "ingredient2": "Eggs",
        "measure2": "3",
        "youtube_url": "https://youtube.com/..."
      }
    ]
  }
}
```

## 📱 Responsive Breakpoints

- **Mobile** - 1 column
- **Tablet** - 2 columns (sm)
- **Medium** - 3 columns (md)
- **Desktop** - 4 columns (lg)

## 🐛 Troubleshooting

### Meals not loading?
- Check browser console for errors (F12)
- Verify API is accessible: https://api.freeapi.app/api/v1/public/meals
- Try clearing browser cache

### Dark mode not working?
- Ensure JavaScript is enabled
- Check localStorage support in browser
- Clear browser cookies/cache

### Favorites not saving?
- Enable localStorage in browser settings
- Check that cookies/website data storage is allowed
- Verify browser isn't in private/incognito mode

## 🚀 Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on each push
4. Live URL: `https://your-project.vercel.app`

### Deploy to GitHub Pages
1. Ensure `index.html` and `app.js` are in the repo root
2. Go to repository Settings → Pages
3. Select `main` branch as source
4. Live URL: `https://sanchitbajpai.github.io/MealsListing`

### Deploy to Netlify
1. Connect GitHub repository
2. Build command: (leave empty - static site)
3. Publish directory: `/` (root)
4. Deploy

## 📋 Submission Checklist

- ✅ Clean, readable UI with Tailwind CSS
- ✅ Meals load correctly from API
- ✅ Search functionality works in real-time
- ✅ Modal displays full recipe details
- ✅ No console errors
- ✅ GitHub repository created and pushed
- ✅ Live deployment link working
- ✅ Dark mode toggle functioning
- ✅ Favorites system with localStorage
- ✅ Ingredients list displayed
- ✅ YouTube links included (when available)
- ✅ Responsive design on all devices
- ✅ Keyboard shortcuts (ESC to close)

## 🎯 Future Enhancements

- [ ] Add meal difficulty level
- [ ] Recipe rating system
- [ ] Share meal on social media
- [ ] Print recipe function
- [ ] Meal filtering by cuisine type
- [ ] Calorie/nutrition information
- [ ] User authentication for cloud-synced favorites
- [ ] Progressive Web App (PWA)

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Sanchit Bajpai**
- GitHub: [@sanchitbajpai](https://github.com/sanchitbajpai)

## 🙏 Credits

- **API**: [Free Meals API](https://api.freeapi.app)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- Icons: Unicode emoji

---

**Happy Cooking! 👨‍🍳**