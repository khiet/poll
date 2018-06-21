[![Build Status](https://travis-ci.org/khiet/poll.svg?branch=master)](https://travis-ci.org/khiet/poll)

<h3 align="center">
  React App inspired by Poll in
  <a href="https://line.me/en-US/">Line App</a>
</h3>

### Project setup

### .env

Set .env based on .env.example

`.env.development.local` for development and `.env.production.local` for deploying on production

### Firebase

The project assumes using Firebase for a backend.

##### Set Firebase Database Rules as follows:

```json
{
  "rules": {
    "polls": {
      ".read": true,
       ".write": "auth != null"
    },
      "votes": {
        ".read": true,
        ".write": true,
        ".indexOn": "pollId"
      },
      "users": {
        ".read": true,
        ".write": true,
        ".indexOn": "localId"
      },
  }
}
```

##### Configure Firebase Authentication Sign-in Method to use Email/Password

##### Hosting

Follow the instructions on Firebase for Hosting. This is usually a simple two-step process using `firebase init` followed by `firebase deploy`.

### Project outline

This is an experimental React project, created by [create-react-app](https://github.com/facebook/create-react-app).

* It uses CSS Modules
* Backend with Firebase
* [react-router](https://www.npmjs.com/package/react-router)
* Test with Jest/Enzyme [TODO]
