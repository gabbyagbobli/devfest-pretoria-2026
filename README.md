# DevFest Pretoria 2026 - Interactive Codelab Portal

This repository contains the interactive, step-by-step codelab web portal for the workshop **"Orchestrating Parallel Agents with Antigravity 2.0 and Gemini 3.7 Flash"** held at DevFest Pretoria 2026.

## 🚀 Live Demo
The portal is deployed live and can be accessed at:  
**[https://devfest-pretoria-2026.web.app](https://devfest-pretoria-2026.web.app)**

---

## ✨ Features

- **Dynamic Navigation & Hash Routing**: Automatically synchronizes the URL hash (e.g. `#step-3`) with the step contents, supporting browser back/forward buttons and direct step linking.
- **Auto-Saving Progress**: Syncs checklist completions and active progress to `localStorage`. If users refresh, they will pick up right where they left off.
- **Copy-to-Clipboard Utility**: Integrated copy buttons on code blocks with quick visual "Copied!" feedback state.
- **Light & Dark Mode**: Modern dark theme by default, toggles to light mode with a smooth visual transition.
- **Fluid Responsiveness**: Flexbox/Grid architecture that collapses the sidebar into an overlay drawer menu on mobile devices.
- **Celebration Confetti**: Embedded high-performance canvas particle system triggers once attendees finish the final step.

---

## 📁 Repository Structure

```text
├── index.html        # Main HTML layout shell
├── styles.css        # Custom HSL design system stylesheet
├── app.js            # Router logic, progress, storage, and confetti effects
├── content.js        # Codelab step titles, durations, and HTML instructions
├── firebase.json     # Firebase hosting rewrite/ignore configurations
├── .firebaserc       # Firebase target project profile pointer
├── package.json      # NPM start server commands metadata
└── README.md         # Documentation guide
```

---

## 🛠️ Local Development

Since this application is built with standard Vanilla HTML5, CSS3, and ES6 JavaScript, there are **no build steps** or compiler requirements.

### Option 1: Double-Click
Simply double-click the `index.html` file to open and run it directly in any modern web browser.

### Option 2: Local Web Server (Recommended)
To run a clean local development server on `http://localhost:3000`:

1. Open your terminal in this directory.
2. Initialize or run via NPM:
   ```bash
   npm start
   ```

---

## ☁️ Deployment

This project is configured for **Firebase Hosting**. To deploy your own copy of the codelab:

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Authenticate the CLI:
   ```bash
   firebase login
   ```
3. Set your active Firebase project ID:
   ```bash
   firebase use --add YOUR_PROJECT_ID
   ```
4. Deploy the files:
   ```bash
   firebase deploy --only hosting
   ```

---

## 📝 License

This project is licensed under the MIT License.
