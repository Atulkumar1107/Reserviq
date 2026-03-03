export const bookingPolicyData = {
  hero: {
    title: "Booking Policy",
    backgroundImage:
      "https://res.cloudinary.com/dwau5poqz/image/upload/v1772555593/pexels-katebranch-8725602_uucovy.jpg",
    breadcrumb: [
      { label: "Home", link: "/" },
      { label: "Booking Policy" },
    ],
  },

  content: {
    intro:
      "At Reserviq, we aim to provide a seamless and transparent booking experience. Please review our booking policy below to understand how reservations, confirmations, and cancellations are handled on our platform.",

    sections: [
      {
        title: "Reservation Process",
        points: [
          "Users must log in to access room booking features.",
          "Room availability is validated in real time based on selected dates.",
          "A reservation is confirmed only after successful submission through the platform.",
        ],
      },
      {
        title: "Availability & Confirmation",
        points: [
          "Selected dates are checked against existing bookings to prevent conflicts.",
          "If the chosen room is unavailable, users will be prompted to select alternative dates.",
          "Confirmation details will be available in the 'My Bookings' section after successful booking.",
        ],
      },
      {
        title: "Modification & Cancellation",
        points: [
          "Bookings may be modified or canceled according to the applicable cancellation terms.",
          "Cancellation requests must be submitted before the check-in date to avoid penalties.",
          "Refund eligibility (if applicable) will follow the terms specified at the time of booking.",
        ],
      },
      {
        title: "User Responsibilities",
        points: [
          "Users are responsible for providing accurate personal and booking details.",
          "Incorrect information may result in reservation issues or cancellation.",
          "Users must ensure compliance with the policies associated with their selected room.",
        ],
      },
      {
        title: "System & Technical Limitations",
        points: [
          "Reserviq strives to ensure accurate availability, but technical errors may occasionally occur.",
          "In case of system conflicts or double bookings due to unforeseen errors, Reserviq reserves the right to resolve the issue appropriately.",
          "We are not liable for disruptions caused by external technical or network failures.",
        ],
      },
    ],

    note:
      "Reserviq is committed to maintaining a smooth booking experience. For any questions regarding reservations or cancellations, please contact our support team at support@reserviq.com.",
  },
};