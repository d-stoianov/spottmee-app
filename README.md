# Spottmee App

This project is **Spottmee App**, initially developed during the **Amsterdam Hack!** ([hackathon](https://lu.ma/j7oaryet?tk=Qf5bH2)). The app was built in just 30 hours and achieved **3rd place** in the competition. The goal was to build a platform powered with AI. Spottmee simplifies the process of sharing photos from events by providing a self face recognition.

The project consumes the **Spottmee Service** ([GitHub Repository](https://github.com/d-stoianov/spottmee-service)) REST API.

The app is live on [spottmee.com](https://spottmee.com)

<img width="1490" alt="screenshot-1" src="https://github.com/user-attachments/assets/94ad13a0-08b1-4e88-8b96-c78e82577e87" />
<img width="1490" alt="screenshot-2" src="https://github.com/user-attachments/assets/b580e3cd-181f-43a6-8ed4-ebf38092b067" />
<img width="1490" alt="screenshot-3" src="https://github.com/user-attachments/assets/c4ec68ea-9ba7-4858-ae4b-bf1c9b597f04" />
<img width="1490" alt="screenshot-4" src="https://github.com/user-attachments/assets/d56ac6ff-bf81-4a4d-bed0-221e30bacd18" />
<img width="1490" alt="screenshot-5" src="https://github.com/user-attachments/assets/0f453bb8-51ec-4d23-998f-1c292998ed5e" />

## Tech Stack

-   **Vite**
-   **React**
-   **TypeScript**
-   **Tailwind CSS**
-   **React Router DOM**

## Pages

### Home Page

The home page provides an ability to upload group photos, for instance for event manager or photographer, then sharing the link created with people from these photos to let them find themselves.

### Event Page

The event page is being created with a unique link containing an (`eventId`) in it, enabling users to access photos from the specific event that were uploaded by event manager. On this page, people can download zip containing all the photos uploaded by the event manager or find themselves uploading their selfie and afterwards downloading zip with photos only with themselves.

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
    npm install
    ```

3.  Setup .env file:

    Create file in the root of the project called `.env`, with the following content:
    `VITE_API_URL=https://api_url`

    You can run and build an spottmee-service yourself and put the link from localhost there. Please see - [spottmee-service](https://github.com/d-stoianov/spottmee-service)

4.  Start the development server:

    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

## Project Structure

-   `src/`: Contains all the source code
    -   `pages/`: Components for each page (Home, Event)
    -   `services/`: API service to fetch data from the spottmee service
    -   `router/`: Router setup
    -   `layout/`: Contains page layout component
    -   `components/`: Contains reusable components that are used in other components

## ESLint

The project uses ESLint and Prettier for code quality and consistency. You can run the linter with:

```bash
npm run lint
```

## Building project

To generate static assets for deployment the project, you can use the following command:

```bash
npm run build
```
