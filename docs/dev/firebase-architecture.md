# Firebase Studio Architecture

This document describes the architecture for the "Firebase Studio" integration, which adds optional cloud synchronization to Cine Power Planner.

## Philosophy: Hybrid First
The application remains "Local-First". Firebase is an *additive* layer.
- **Primary Source of Truth**: The LocalStorage / IndexedDB on the user's device.
- **Secondary Source**: Firestore (Cloud).

## Data Model

### Data mapping
We map the local `Project` object to a Firestore Document.

**Local Project Structure:**
```json
{
  "id": "uuid-v4",
  "name": "My Project",
  "created": 123456789,
  "lastModified": 123456799,
  "gearList": [ ... ]
}
```

**Firestore Document Structure (`/projects/{projectId}`):**
```json
{
  "ownerId": "firebase-auth-uid",
  "name": "My Project",
  "lastModified": 123456799,
  "data": "{Serialized JSON Blob or Sub-collections}"
}
```

*Note: For simplicity and to maintain 1:1 parity with the local export format, the initial version stores the complex `gearList` as a serialized JSON blob or deeply nested map, rather than normalizing it into SQL-like relations.*

## Authentication
We use **Firebase Authentication** (Google Provider & Email/Password).
- **Anonymous Auth**: Supported for users who want to test the cloud features without an account (data mapped to a temporary UID).
- **Link Accounts**: Users can upgrade anonymous accounts to permanent ones.

## Security Rules
Firestore Security Rules enforce ownership and privacy.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      // Only the owner can read/write their project
      allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId;
      // Allow creation if the new document assigns the correct owner
      allow create: if request.auth != null && request.resource.data.ownerId == request.auth.uid;
    }
  }
}
```

## Synchronization Logic
The application listens to Firestore `onSnapshot` updates when "Online Mode" is active.

1. **Local Change**:
   - Save to LocalStorage (as usual).
   - If (Online && CloudEnabled): Debounce -> Write to Firestore.

2. **Cloud Change (Remote)**:
   - `onSnapshot` fires.
   - Compare `lastModified` timestamps.
   - If `remote.lastModified > local.lastModified`:
     - Prompt user: "New version available from cloud. Overwrite local?" OR Auto-merge (if trivial).
     - Update LocalStorage.
     - Refresh UI.

## Offline Capabilities
Since the app is already offline-first, "offline" for Firebase just means the sync pauses. The Firebase SDK handles queueing offline writes (if enabled) but we primarily rely on our own LocalStorage logic as the robust offline layer to avoid complexity with Firebase's offline cache size limits.
