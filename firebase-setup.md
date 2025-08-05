# Firebase Setup Instructions

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select your existing "ATNS Conf" project
3. Enable Google Analytics (optional)

## Step 2: Set up Web App
1. In your Firebase project, click the web icon (`</>`) to add a web app
2. Register your app with a nickname like "ATNS Conference App"
3. Copy the Firebase configuration object

## Step 3: Environment Variables
Create a `.env.local` file in your project root with the following:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

Replace the placeholder values with your actual Firebase configuration values.

## Step 4: Enable Firestore
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for now (you can secure it later)
4. Select a location close to your users

## Step 5: Security Rules (Optional but Recommended)
Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to users collection for authenticated users
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow read access to session data
    match /sessions/{sessionId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Features Implemented

✅ **Simple Name-Based Authentication**: Users can sign in with just their name and optional email
✅ **Breakout Session Registration**: Users can register for up to 3 breakout sessions with capacity limits
✅ **Clickable Topics**: Session topics are clickable and show speaker details
✅ **Enhanced Color Coding**: Different event types have distinct colors with borders
✅ **Map Tab**: Venue layout with room locations and directions
✅ **Speakers Tab**: Dedicated speaker profiles with search functionality
✅ **Notifications Tab**: Live text notifications signup system
✅ **Lunch Table Topics**: Discussion group signups for lunch tables
✅ **Persistent Sessions**: User data is saved to localStorage and Firebase

## Usage

1. Users can sign in by clicking "Sign In" and entering their name
2. Once signed in, they can register for breakout sessions (max 3)
3. Click on session titles or speaker names to view detailed information
4. Use the Map tab to find room locations
5. Browse speakers and their profiles
6. Enable notifications for live updates
7. Join lunch table discussions

The app works offline for basic functionality and syncs with Firebase when online.