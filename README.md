# The Book Nook 📚

## Project idea
The Book Nook is a beginner-friendly, responsive book collection website for readers who want to discover books by genre, search for titles or authors, and save books to a personal reading list.

**Purpose:** Make browsing a small book collection simple, inviting, and enjoyable.  
**Target audience:** Students, casual readers, and anyone looking for their next book.

## Features
- Responsive layout for desktop, tablet, and mobile screens
- Search books by title or author
- Filter books by genre
- Save and remove books from a reading list
- Reading list is stored in the browser using `localStorage`
- Mobile navigation menu and interactive feedback messages
- CSS-designed book covers; no separate image files are needed

## Technology stack
- HTML5 for structure
- CSS3 for layout, styling, and responsive design
- JavaScript for search, filters, saved books, and navigation
- Browser `localStorage` for saving the reading list locally

## Project files
- `index.html` — website content and structure
- `style.css` — colours, layout, book-cover designs, and responsive rules
- `script.js` — interactive features

## How to run locally
1. Download or clone this repository.
2. Keep `index.html`, `style.css`, and `script.js` in the same folder.
3. Open `index.html` in a modern web browser.

No package installation or build step is required. An internet connection is only needed to load the optional Google Fonts; the site uses fallback fonts if they are unavailable.

## Deployment with GitHub Pages
1. Push all three project files to the root of a GitHub repository.
2. Open the repository's **Settings**.
3. Select **Pages** from the sidebar.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then click **Save**.
6. Wait for GitHub Pages to publish the site. Copy the live URL shown in the Pages section.

## Notes
The book list and ratings are sample content for this demonstration. Saved books are stored in the visitor's own browser and are not shared between devices.

## Conclusion
The Book Nook demonstrates how HTML, CSS, and JavaScript can be combined to create a clean, interactive, and responsive website for a small book collection.
