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
