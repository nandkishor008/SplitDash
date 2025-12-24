# SplitDash –  Group Expense Tracker

SplitDash is a full-stack web application that helps groups track shared expenses, split bills using different methods, and see simplified balances between members. 

---

## Live Deployment
Frontend: https://main.d2ohij8v8olini.amplifyapp.com/

Backend API: https://splitdash.onrender.com/api

Source Code: https://github.com/nandkishor008/SplitDash

## Features

### Core features

- **Groups management**
  - Create groups for trips, events, or shared households.
  - See member count per group and switch between groups from the sidebar.
- **Friends management**
  - Add friends with a name and manage them in the left sidebar.
  - Quickly reuse the same friends in multiple groups.
- **Shared expenses**
  - Add expenses with description, total amount, payer, split type, and participants.
  - Supports multiple split types:
    - **Equal** – total is divided equally between all selected participants.
    - **Exact** – you manually enter the exact amount each participant should pay.
    - **Percent** – you specify a percentage share for each participant; all shares must sum to 100%.

### Balances and dues

- **Per-user balances**
  - For each group, show how much each member **owes** and **is owed**.
  - Display amounts per user in a table similar to Splitwise.
- **Simplified dues**
  - Show a list of pairwise debts where A owes B some amount.
  - This gives a minimal set of “who should pay whom” transactions so the group can settle up easily.
- **Settle functionality (optional/if implemented)**
  - Allow marking dues as settled and update balances accordingly.

### UI / UX

- **Modern dark dashboard layout**
  - Sidebar on the left with Friends and Groups.
  - Main area with group header, cards, and tables.
- **Responsive design**
  - Works on desktop and hides sidebar on smaller screens.
- **Themed styling**
  - Uses CSS variables for colors: background, accent green, muted text, borders, and danger red.
  - Cards have a radial-gradient background and subtle box shadow for a premium look.
- **Scroll styling**
  - Scrollable sections inside cards and the sidebar.
  - Custom thin dark scrollbar with rounded thumb for supported browsers.

---

## Tech Stack

### Frontend

- **React** (Create React App)
- **React Hooks** (`useState`, `useEffect`) for state and side effects
- **Axios** for HTTP requests to the backend
- **Icons**: `react-icons` (e.g., `FaWallet` for the logo icon)
- **CSS**:
  - Custom layout and design using a single main stylesheet.
  - CSS variables (`:root`) for theme tokens.
  - Custom scrollbars (`::-webkit-scrollbar`) for scrollable sections.

### Backend

- **Node.js** and **Express**
  - RESTful API for friends, groups, expenses, and balances.
- **Database** (likely MongoDB in a typical MERN stack)
  - Stores users/owner, friends, groups, and expense documents.
- **Business logic**
  - Endpoints to:
    - Create and fetch friends (`/friends`).
    - Create and fetch groups (`/groups`).
    - Create expenses with different split types.
    - Calculate resulting balances and simplified dues.

*(Adjust the database and exact endpoints section below to match your implementation.)*

---



## Key Frontend Components

### `Sidebar.jsx`

- Displays:
  - App logo and name (**SplitDash**).
  - Friends list with **Add friend** button and modal.
  - Groups list with **New group** button and group selection.
- Manages:
  - `friends` and `groups` state.
  - Fetching friends and groups from backend on mount.
  - Emitting `onGroupSelected` and `onFriendsLoaded` callbacks to the parent.
- Uses a `scroll-section` CSS class on the Friends and Groups list containers to show a thin dark scrollbar when the content overflows.

### `ExpenseModal.jsx` (or similar)

- Modal used to create a **New expense** inside a group.
- Inputs:
  - Description
  - Total amount
  - Payer (select from group members)
  - Split type: Equal / Exact / Percent
  - Participants (chips for each group member)
- Behavior:
  - **Equal split**: total / number of participants is computed on the backend (or frontend before sending).
  - **Exact split**:
    - User enters each participant’s amount.
    - Validation ensures that the sum of exact amounts equals the total.
  - **Percent split**:
    - User enters percentage for each participant.
    - Validation ensures that the total percentage is 100%.
- On submit:
  - Sends a POST request via `axiosClient` to the backend with the expense payload.
  - On success, closes the modal and triggers a reload of balances.

### `BalancesCard.jsx` (or similar)

- Shows **Balances & dues**.
- Contains:
  - “Per user” table – `User`, `Owes`, `Owed`.
  - “Simplified dues” table – `From`, `To`, `Amount`.
- Uses `.scroll-section` for vertical scrolling inside tables.

---

## Key Backend Endpoints (example)

Adjust these to match your actual routes.

### Friends

- `GET /friends?ownerId=:ownerId`
  - Returns all friends for the owner.
- `POST /friends`
  - Body: `{ ownerId, name }`
  - Creates a new friend.

### Groups

- `GET /groups?ownerId=:ownerId`
  - Returns all groups for the owner.
- `POST /groups`
  - Body: `{ ownerId, name, memberIds }`
  - Creates a group with selected members.

### Expenses

- `POST /groups/:groupId/expenses`
  - Body example for **Equal**:
    ```
    {
      "description": "Dinner",
      "totalAmount": 1200,
      "paidBy": "userIdOfPayer",
      "splitType": "EQUAL",
      "participants": ["u1", "u2", "u3"]
    }
    ```
  - Body example for **Exact**:
    ```
    {
      "description": "Dinner",
      "totalAmount": 1200,
      "paidBy": "userIdOfPayer",
      "splitType": "EXACT",
      "shares": [
        { "userId": "u1", "amount": 500 },
        { "userId": "u2", "amount": 400 },
        { "userId": "u3", "amount": 300 }
      ]
    }
    ```
  - Body example for **Percent**:
    ```
    {
      "description": "Dinner",
      "totalAmount": 1200,
      "paidBy": "userIdOfPayer",
      "splitType": "PERCENT",
      "shares": [
        { "userId": "u1", "percent": 50 },
        { "userId": "u2", "percent": 30 },
        { "userId": "u3", "percent": 20 }
      ]
    }
    ```

- The backend:
  - Validates that for `EXACT`, sum of amounts equals `totalAmount`.
  - Validates that for `PERCENT`, sum of percents is 100.
  - Computes who owes how much to whom and updates balances collection or returns the computed balances.

---


## Production Deployment

### AWS Amplify (Frontend) – LIVE

Connected to GitHub → Auto-deploys on push
Build: npm ci && npm run build
Output: frontend/build
Domain: https://main.d2ohij8v8olini.amplifyapp.com/


### Render (Backend) – LIVE

Connected to GitHub → Auto-deploys on push
Build: npm install
Start: npm start
Domain: https://splitdash.onrender.com/api









