# ☕ Cafe Finder  

A responsive web app to discover and save nearby cafes using **Google Maps Platform’s Places API**, built with **HTML, CSS, and JavaScript**.  
Cards support swipe gestures to quickly save favorite cafes. Deployed on **Vercel**.  
---

## ✨ Features
- 📍 Find cafes close to your real-time location (works on desktop & mobile browsers)  
- 👉 Swipe right to save cafes, left to dismiss  
- 💾 Saved cafes are stored in your browser’s **localStorage**  
- 📑 View saved cafes anytime  
- 🎨 Simple, clean, and mobile-friendly UI  
- ⚡ No backend required — fully client-side  

---

## 📸 Screenshots
*(Add screenshots here)*  

---

## ⚙️ How It Works
1. Gets your location (with permission).  
2. Fetches nearby cafes from the **Google Places API**.  
3. Renders cafes as swipeable cards with **name, photo, and rating**.  
4. Swipe right to save, left to dismiss.  
5. Favorites are cached locally in **localStorage**.  

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **APIs:** Google Maps Platform – Places API  
- **Gestures:** [Hammer.js](https://hammerjs.github.io/)  
- **Hosting:** [Vercel](https://vercel.com/)  

---

## 🚀 Setup & Deployment  

### 1. Get a Google Places API Key
- Go to **Google Cloud Console**.  
- Enable **Places API** for your project.  
- Create an API Key.  
- Add Application Restrictions:  
  - Website:  
    ```
    https://mocha-fqb3naivz-vihaans-projects-2115cc78.vercel.app/*
    ```
  - (Optional) For local testing:  
    ```
    http://localhost:*
    ```
- Restrict the key to **Places API** for security.  
- Enable **billing** (required, even for free tier).  

---

### 2. Clone & Configure
```bash
git clone https://github.com/your-username/your-cafe-finder-repo.git
cd your-cafe-finder-repo
