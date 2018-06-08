### Set .env.development.local based on .env.example
### Set .env.development.local based on .env.example

### Firebase Database Rules

```
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

### Set Firebase Authentication Sign-in Method to Email/Password
