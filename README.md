# Sticky Notes App
A simple sticky notes app built with HTML, CSS, and JavaScript, with Firebase integration for cloud storage.

## Features
- Add new notes with title and content
- Edit existing notes
- Delete notes
- Responsive design for mobile and desktop
- Notes sync across devices using Firebase Realtime Database

## Demo
https://sahilsharma2246.github.io/Sticky-Notes/

## Installation
1. Clone the repository: `git clone https://github.com/sahilsharma2246/Sticky-Notes.git`
2. Open `index.html` in your browser

## Usage
1. Click the "Add Note" button to create a new note
2. Click on a note to edit its title and content
3. Click the "Delete" button to remove a note

## Tech Stack
- HTML
- CSS
- JavaScript
- Firebase Realtime Database

## Firebase Setup
1. Create a Firebase project in the Firebase Console
2. Enable Realtime Database
3. Copy your Firebase config object
4. Replace the config in `script.js` with yours:
```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
