# Car Wash Booking System

### Technology used:
To design this project, here is used Modular pattern with some tech like Typescript, Node.js, Express.js, Mongoose, ZOD validator and JWT Authenticator/Authorizer.

### How to start:
1. First install some required npm packages like express, mongoose, typescript, cors, prettier, eslint etc. and then initialize them.
2. Create modules for users/auth, services, slots and bookings with their interface, model, validation, service, controller and route.
3. To run the server, command is: npm run start:dev (development mode) || npm run start:prod (production mode)
4. To set the environment by following src/app/config/index.ts file.
5. Also follow the package.json file for more info like npm package or commands.

### Live link:


### Important routs:
1. To sign up (anyone): /api/auth/signup (POST)
2. To get all user (only by admin): /api/auth/users (GET)
3. To login (anyone): /api/auth/login (POST)
----------------------------------------
4. To create service (only by admin): /api/services (POST)
5. To get a service (anyone): /api/services/:id (GET)
5. To get all services (anyone): /api/services (GET)
6. To update a service (only by admin): /api/services/:id (PUT)
7. To delete (soft) a service (only by admin): /api/services/:id (DELETE)
----------------------------------------
8. To create slots (only by admin): /api/services/slots (POST)
9.1. To get available slots (anyone): /api/slots/availability (GET)
9.2. Also can use query parameters such as 'date' and 'serviceId' (anyone): /api/slots/availability?date=2024-06-15&serviceId=60d9c4e4f3b4b544b8b8d1c5 (GET)
10. To get available slots by serviceId (anyone): /api/slots/availability/:id (GET)
-----------------------------------------
11. To book a service (only by user): /api/bookings (POST)
12. To get all bookings (only by admin): /api/bookings (GET)
13. To get user's booking (only by user): /api/my-bookings (GET)

### Features of the application:
1. Anyone can register as admin or user,
2. Valid user can login.
3. Admin can create, update, delete a service and anyone can access the services.
4. Admin can create slots as per service and anyone can access the slots.
5. User can create bookings and access his/her bookings. Admin can access all bookings.
6. Validation, Authentication and Authorization are properly used.