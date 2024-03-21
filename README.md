# travelPlannerFontend
## Travel Planner Frontend

This repository contains the frontend codebase for a Travel Planner application. It allows users to register new trips, view existing trips, and update trip details.

### Components

1. **TripRegistration**: Allows users to register a new trip with details such as destination, start date, end date, and activities.

2. **TripList**: Displays a list of all registered trips, including details like destination, start date, end date, and activities. Provides options to update or delete each trip.

3. **UpdateTripModal**: Modal window for updating trip details. Users can modify destination, start date, and end date fields, as well as update associated activities.

4. **WelcomePage**: Presents a welcome message to users when they first access the application. Displays an animated greeting ("Welcome to Trip Planner") and transitions to the main interface after a specified duration.

### Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Styled Components**: Library for styling React components with scoped styles.
- **Axios**: Promise-based HTTP client for making requests to the backend API.
- **Redux**: State management library for managing application state and data flow.

### Usage

To run the frontend locally:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm start`.
5. Access the application in your web browser at `http://localhost:3000`.

### Backend Integration

Ensure that the backend server is running to enable full functionality. Refer to the backend documentation for setup and usage instructions.

