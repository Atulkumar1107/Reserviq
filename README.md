# Reserviq -- Room Reservation Platform

Reserviq is a room booking dashboard built with **Next.js**. The goal of
this project is to provide a simple and smooth way to explore rooms and
manage reservations through a clean dashboard interface.

The UI follows a **botanical theme** and focuses on delivering a good
user experience across different devices.

------------------------------------------------------------------------

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed on your system:

-   Node.js (v18 or higher recommended)
-   npm or yarn

------------------------------------------------------------------------

## Installation

Clone the repository and install the dependencies.

``` bash
git clone <repository-url>
cd frontend-assignment
npm install
```

------------------------------------------------------------------------

## Run the Development Server

Start the project in development mode:

``` bash
npm run dev
```

After that, open the browser and visit:

http://localhost:3000

------------------------------------------------------------------------

## Production Build

To build the project for production:

``` bash
npm run build
```

Then start the production server:

``` bash
npm run start
```

------------------------------------------------------------------------

## Features

-   **Authentication System**\
    Basic login and registration flow using a mock authentication setup
    with session persistence in localStorage.

-   **Protected Routes**\
    Certain pages like dashboard, profile, and bookings are only
    accessible when a user is authenticated.

-   **Room Booking System**\
    Users can browse available rooms, simulate availability, and manage
    their reservation history.

-   **Responsive Layout**\
    The interface works well across desktop, tablet, and mobile screens.

-   **Botanical UI Theme**\
    Clean and modern design with a nature-inspired visual style.

-   **Contact Form**\
    A working contact form powered by EmailJS.

------------------------------------------------------------------------

## Tech Stack

This project is built using:

-   **Next.js (App Router)**
-   **React**
-   **Tailwind CSS**
-   **Lucide React Icons**
-   **React Context API** for state management

------------------------------------------------------------------------

## Project Structure

    src/
     ├── app/         # Application routes and pages
     ├── components/  # Reusable UI components
     ├── context/     # Auth and booking state management
     ├── data/        # Static room data
     └── lib/         # Utility functions and configurations

------------------------------------------------------------------------

## Architecture Notes

Additional implementation details such as edge cases, loading states,
and some architectural decisions are documented in the
`architecture-notes.txt` file located in the root directory.

------------------------------------------------------------------------

## Contact

If you have any questions or suggestions, feel free to reach out through
the **Contact page inside the application**.
