# Spottmee App

**Spottmee** is a platform that simplifies photo sharing by using a selfie for **automatic face recognition**. It's an ideal tool for **photographers and event managers** to share their event photo collections, making it easy for attendees to quickly find and access their own photos.

Powered by the [Spottmee API](https://github.com/d-stoianov/spottmee-api) & [Spottmee Face Embeddings Worker](https://github.com/d-stoianov/spottmee-face-embeddings-worker)  
Live App: [app.spottmee.com](https://app.spottmee.com)  
Landing Page: [spottmee.com](https://spottmee.com)

---

### 🏆 Hackathon Achievement

**Spottmee** was initially developed during the [Amsterdam Hack!](https://lu.ma/j7oaryet?tk=Qf5bH2) — a 30-hour hackathon sponsored by [JetBrains](https://www.jetbrains.com/) where the team achieved **3rd place** and  **€1,000** in cash for building a functional prototype within a very tight timeline.

---

## Screenshots

<img width="1508" height="854" alt="1" src="https://github.com/user-attachments/assets/c0f5fd4b-eb77-4edf-b939-425d8bc553b0" />
<img width="1508" height="849" alt="2" src="https://github.com/user-attachments/assets/0564048d-0e03-4362-9fe1-09cde45df8f0" />
<img width="1511" height="855" alt="3" src="https://github.com/user-attachments/assets/6617625b-ca1e-4268-b738-f338d6ba84ab" />
<img width="1511" height="849" alt="4" src="https://github.com/user-attachments/assets/cfdb1cd6-fe22-4a20-9cb8-b62cf2691575" />
<img width="1512" height="857" alt="5" src="https://github.com/user-attachments/assets/0fecb0bc-5da5-4085-80f1-c1f22676b35a" />

---

## Tech Stack

-   **Vite**
-   **React**
-   **TypeScript**
-   **React Router DOM**
-   **Tailwind CSS**
-   **Motion**

---

## Project Structure
-   `src/`: Contains all the source code
    -   `app/`: App's entry point and routes definitions
    -   `assets/`: Static assets (images)
    -   `components/`: Contains reusable components like Button, Input, etc
    -   `config/`: Configuration files
    -   `features/`: This folder includes separate features and its components
    -   `hooks/`: Reusable hooks (not feature specific)
    -   `locales/`: Localization files with key-value translation pairs
    -   `providers/`: App's global providers, e.g. AuthProvider
    -   `services/`: Services to work with the API data
    -   `utils/`: Helper functions

---

## Getting Started

### Prerequisites

-   Node.js
-   npm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/d-stoianov/spottmee-app.git
    cd spottmee-app
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Setup .env file:

    Create file in the root of the project called `.env`, with the following content:
    ```bash
    VITE_API_URL=https://api_url
    VITE_FIREBASE_CONFIG_STR=YOUR_FIREBASE_CONFIG
    ```
    You can run and build spottmee-api yourself and put the localhost url there. Please see - [spottmee-api](https://github.com/d-stoianov/spottmee-api)
    <br>
    <br>
    How to setup Firebase and get the config you can find here - https://firebase.google.com/docs/web/setup
    <br>
    <br>

4. Start the development server:

    ```bash
    pnpm run dev
    ```
5. Open your browser and navigate to `http://localhost:5173`.

### ESLint

The project uses ESLint and Prettier for code quality and consistency. You can run the linter with:

```bash
pnpm run lint
```

### Building project

To generate static assets for deployment, you can use the following command:

```bash
pnpm run build
```
