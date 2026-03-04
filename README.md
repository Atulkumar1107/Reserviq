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

## Project Structure

    src/
     ├── app/         # Application routes and pages
     ├── components/  # Reusable UI components
     ├── context/     # Auth and booking state management
     ├── data/        # Static room data
     └── lib/         # Utility functions and configurations

------------------------------------------------------------------------

## Application Flow

The application simulates a realistic hotel-style room booking experience.  
While the original assignment focused on a booking dashboard, the project was expanded to include a complete website flow with public pages, authentication, and protected booking features.

---

### Public Website Experience

When a user visits the platform, they first interact with the public-facing website pages.

1. **Home Page (Landing Page)** – Introduces the platform and highlights the room booking experience.
2. **About Us Page** – Provides background information about the service.
3. **Room Listings Page** – Displays available rooms with pricing and key details.
4. **Policies Pages** – Includes booking policy and terms & conditions.
5. **Contact Page** – Allows users to send inquiries using a functional contact form powered by EmailJS.

These pages allow users to explore the platform before logging in.

---

### Authentication & Protected Routes

The application uses basic authentication simulation.

- Users must **log in** to access the booking dashboard and booking management features.
- If a user is **not authenticated**, they cannot access:
  - Dashboard
  - Room booking features
  - My Bookings page
  - Profile page

This is implemented using a **ProtectedRoute wrapper**, ensuring that only authenticated users can access private sections of the application.

---

### Room Booking Flow

After authentication, users can interact with the booking system.

1. After login, the user is redirected to the **Dashboard**.
2. The dashboard displays a **list of available rooms** with price and essential details.
3. Users can apply **filters and sorting options** to browse rooms more easily.
4. When a room is selected, the user can view **complete room details**, including images and gallery.
5. The user selects:
   - **Check-in date**
   - **Check-out date**
   - **Number of guests**
6. The system checks **room availability** for the selected dates.
7. If the room is available, the user can **confirm the booking**.
8. After confirmation, the system displays a **booking confirmation message**.

---

### My Bookings

Users can manage their reservations through the **My Bookings** page.

This page displays:

- All bookings created by the logged-in user
- Room information
- Booking dates
- Guest details

Users also have the ability to **cancel an existing booking**.

---

### Additional User Features

The platform also includes:

- **User Profile Page** for viewing user information.
- **Authentication Pages** (Login / Register).
- **Protected routes** for booking-related pages.
- **Responsive UI** designed to work across mobile, tablet, and desktop devices.

---

### Contact Form (EmailJS Integration)

The contact page includes a fully functional contact form powered by **EmailJS**.

This allows users to submit inquiries directly from the website without requiring a custom backend server.  
Form submissions are securely processed through EmailJS and delivered to the configured email address.

---

### Note About the Assignment

The original assignment focused on implementing the **room booking dashboard flow**.  
To make the project more realistic and closer to a production-level booking platform, additional public pages, navigation, and user experience improvements were added.
