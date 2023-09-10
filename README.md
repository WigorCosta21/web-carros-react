# WebCars Project

This is the repository for the WebCars project, a web application developed in React through Matheus Fraga's React with TypeScript course, designed to find new and used cars throughout Brazil. In this project, you can list cars for sale, search for cars by name, view details of a specific car, and contact the seller via WhatsApp.

## Technologies Used

- React: The JavaScript library for building the user interface.
- Firebase: For real-time data storage and authentication.
- React Router: For managing application routes.
- React Hook Form: For efficient form handling.
- Swiper: For creating an interactive image gallery.
- Zod: For form validation.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- Toast: For displaying notification messages.

## Project Structure

The project is organized into various pages and components. Here's a brief description of each file:

### `pages/home`

- Home page that displays the list of cars.
- Cars are loaded from Firebase Firestore.
- Cars can be searched by name.
- Each car displays its image, name, year, mileage, city, and price.

### `pages/login`

- Login page to authenticate users.
- Uses Firebase Authentication for email and password login.
- Redirects to the dashboard page after successful login.

### `pages/register`

- Registration page to create new user accounts.
- Uses Firebase Authentication to create a new account with email and password.
- Redirects to the dashboard page after successful registration.

### `pages/dashboard`

- Dashboard page for authenticated users.
- Displays the list of cars added by the authenticated user.
- Allows the user to delete cars from the list.

### `pages/dashboard/new`

- Page for adding new cars.
- Allows the user to add car details, images, and a description.
- Images are uploaded and stored in Firebase Storage.

### `pages/car/:id`

- Car detail page.
- Displays detailed information about a specific car, including images.
- Allows the user to contact the seller via WhatsApp.

It seems like you've provided code related to a web application using React and Firebase for authentication and route management. I'll continue the README with information about how these components and services are being used in the application.

## Project Layout

In this section, you'll find images that showcase the layout and appearance of the WebCars project. This can help you visualize how the application looks and how the components are organized. Below are some representative screenshots:

### Home Page

![Home Page](https://github.com/WigorCosta21/servidor_estaticos/blob/main/home-cars.jpg?raw=true)

### Login Page

![Login Page](https://github.com/WigorCosta21/servidor_estaticos/blob/main/login-car.jpg?raw=true)

### Registration Page

![Registration Page](https://github.com/WigorCosta21/servidor_estaticos/blob/main/cadastro-car.jpg)

### Dashboard Page

![Dashboard Page](https://github.com/WigorCosta21/servidor_estaticos/blob/main/dashboard-cars.jpg?raw=true)

### New Car Dashboard Page

![New Car Dashboard Page](https://github.com/WigorCosta21/servidor_estaticos/blob/main/dashboard-new-car.jpg?raw=true)

### Car Detail Page

![Car Detail Page](https://github.com/WigorCosta21/servidor_estaticos/blob/main/car-detail.jpg?raw=true)

Please make sure to replace the image URLs in the example with the actual URLs of the images you want to include. This will provide readers of the README with a clear idea of the design and layout of the project.

## Directory Structure

Here's the directory structure of your project:

- `components`: Contains reusable components.

  - `container`: A container component to wrap page content. It's used to ensure content is displayed within a specific layout.
  - `header`: The website header that displays the logo and login/logout buttons.
  - `input`: A form input component that can display errors. It's used to collect user information such as name and password.
  - `layout`: Layout component that wraps the header and page content. This is used to maintain consistent layout throughout the application.
  - `panelHeader`: The header of the panel page, which has links to the dashboard and a logout button.

- `context`: Contains the authentication context.

  - `AuthContext`: A context that provides authentication information such as whether the user is authenticated, user information, etc.
  - `AuthProvider`: A context provider that wraps the app and manages the authentication state.

- `routes`: Contains components related to routes.

  - `Private`: A component that protects private routes, redirecting the user to the login page if not authenticated.

- `services`: Contains Firebase configurations and utilities.

  - `firebaseConnection`: Firebase settings, including app initialization, authentication, Firestore, and storage.

- `pages`: Contains the application pages.

  - `Home`: The site's home page.
  - `Login`: Login page.
  - `Register`: Registration page.
  - `Dashboard`: Dashboard page.
  - `New`: Page for adding a new car.
  - `CarDetail`: Car detail page.

- `assets`: Contains assets such as images.

- `App`: The main application file where routes are configured and the router is rendered.

## Reusable Components

Reusable components are stored in the `components` folder and include:

- `Container`: A component that wraps page content. It is used to ensure that content is displayed within a specific layout.

- `Header`: The website header that displays the logo and login/logout buttons, depending on the authentication state.

- `Input`: A form input component that can display errors. It is used to collect user information, such as name and password.

- `Layout`: A component that wraps the header and page content. This is used to maintain a consistent layout throughout the application.

- `DashboardHeader`: The header of the panel page, which contains links to different parts of the panel and a logout button.

## Authentication Context

The authentication context is managed in the `context` folder and includes:

- `AuthContext`: A context that provides authentication information, such as whether the user is authenticated, user information, and loading status.

- `AuthProvider`: A context provider that wraps the app and manages the authentication state. It uses Firebase to authenticate users and updates the context with authentication information.

## Routing

Routing is configured in the `App` file using `react-router-dom`. The router is set up with various routes, including public and protected routes. The `Private` component is used to protect routes that require authentication, redirecting the user to the login page if not authenticated.

## Firebase Services

Firebase configuration and initialization are done in the `services/firebaseConnection` file. It initializes Firebase with the provided settings and provides instances for authentication, Firestore, and storage.

This is a summary of your application's structure and components. If you have any specific questions or need more information about any aspect of the code, please let me know!

## How to Run

To run the project locally, follow these steps:

1. Clone the repository to your development environment.
2. Make sure you have Node.js installed.
3. In the project's root directory, run `npm install` to install dependencies.
4. Configure Firebase credentials in a `.env` file in the project's root directory. Refer to the Firebase documentation for details on how to set up credentials.
5. Run `npm start` to start the application.
6. Open your browser and access `http://localhost/5173` to view the project.

Remember that you should also set up a Firebase project and enable email and password authentication, as well as Firestore and Storage, for the application to work correctly.

Enjoy exploring and developing the WebCars project!
