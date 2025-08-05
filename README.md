# ATNS 2025 Conference App

The official conference app for the **Association for the Treatment of Neuroplastic Symptoms (ATNS) 2025 Conference**, taking place September 28-30, 2025 in Boulder, Colorado.

## 🎯 About the Conference

The ATNS 2025 Conference brings together leading experts in neuroplastic symptoms treatment, featuring:

- **3 days** of comprehensive programming
- **24 breakout sessions** with expert-led concurrent sessions  
- **Interactive schedule** with personalized registration
- **Venue mapping** and navigation assistance
- **Materials hub** for presentations and resources

## 🚀 Features

- **📅 Interactive Schedule**: Complete 3-day program with session details
- **🎫 Breakout Registration**: Register for up to 3 sessions per day
- **👥 Speaker Directory**: Browse expert profiles and session information
- **🗺️ Venue Map**: Embedded Google Maps for navigation
- **📚 Materials Access**: Download presentations and resources
- **🔔 Notifications**: Stay updated with conference announcements
- **🍽️ Lunch Tables**: Register for topic-based lunch discussions

## 🛠️ Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Firebase** - Real-time database and authentication
- **Vercel** - Deployment and hosting

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/lukejoneslj/conference.git
   cd conference
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Firebase configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Add your Firebase config to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config
   ```

### Deployment

The app is deployed on Vercel at [atns2025.vercel.app](https://atns2025.vercel.app)

To deploy your own instance:
```bash
npm run build
vercel --prod
```

## 📊 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/ui/          # shadcn/ui components
├── contexts/              # React contexts (Auth, etc.)
├── data/                  # Static data files
├── lib/                   # Utilities and Firebase config
└── styles/                # Global styles
```

## 🤝 Contributing

This project is maintained for the ATNS 2025 Conference. For questions or issues, please contact the conference organizers.

## 📄 License

This project is proprietary software for the ATNS 2025 Conference.

---

**Association for the Treatment of Neuroplastic Symptoms**  
*Advancing the understanding and treatment of neuroplastic symptoms*
