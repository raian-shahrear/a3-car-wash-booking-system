# Car Wash Booking System

### Technology used:
- To design this project, here is used Modular pattern with some tech like Typescript, Node.js, Express.js, Mongoose, ZOD validator and JWT Authenticator/Authorizer.
- AAmarPay payment system implemented, applicable for booking a service.

### How to start:
1. First install some required npm packages like express, mongoose, typescript, cors, prettier, eslint etc. and then initialize them.
2. Create modules for users/auth, services, slots and bookings with their interface, model, validation, service, controller and route.
3. To run the server, command is: `npm run start:dev` (development mode) || `npm run start:prod` (production mode)
4. To set the environment by following `.env.example` file.
5. Also follow the package.json file for more info like npm package or commands.

### Live link:
https://car-wash-booking-system-backend-six.vercel.app

### Important routes:
- --------------------Auth------------------------
1. To sign up (anyone): /api/auth/signup (POST)
2. To login (anyone): /api/auth/login (POST)
3. To get all user (only by admin): /api/auth/users (GET)
4. To update user (only by admin): /api/auth/user/:id (PATCH)
5. To update user-role (only by admin): /api/auth/user-role/:id (PATCH)
- --------------------Service------------------------
6. To create service (only by admin): /api/services (POST)
7. To get a service (anyone): /api/services/:id (GET)
8. To get all services (anyone): /api/services (GET)
9. To get featured services (anyone): /api/services/featured (GET)
10. To get services-name for dropdown (anyone): /api/services/service-list (GET)
11. To update a service (only by admin): /api/services/:id (PUT)
12. To delete (soft) a service (only by admin): /api/services/:id (DELETE)
- --------------------Slot------------------------
13. To create slots (only by admin): /api/services/slots (POST)
    14.1. To get all slots (anyone): /api/slots (GET)
    14.2. Also can use query parameters such as 'date' and 'service' (anyone): /api/slots?date=2024-06-15&service=60d9c4e4f3b4b544b8b8d1c5 (GET)
14. To get slots by serviceId (anyone): /api/slots/:id (GET)
15. To update slot status by serviceId (only bu admin): /api/slots/:id (PATCH)
- --------------------Booking------------------------
16. To book a service (only by user): /api/bookings (POST)
17. To get all bookings (only by admin): /api/bookings (GET)
18. To get user's expired bookings (only by user): /api/my-bookings/expired (GET)
19. To get user's upcoming bookings (only by user): /api/my-bookings/upcoming (GET)
- --------------------Client Review------------------------
20. To create client review (only by user): /api/reviews (POST)
21. To get all reviews (by user & admin): /api/reviews (GET)
22. To get user's reviews (only by user): /api/reviews/my-reviews (GET)
23. To update user's reviews (only by user): /api/reviews/:id (PATCH)
24. To delete review (by user & admin): /api/reviews/:id (DELETE)

### Features of the application:

1. Anyone can register as user, default admin will change the role if needed,
2. Valid user can login.
3. Admin can create, update, delete a service and anyone can access the services.
4. Admin can create, update slots as per service and anyone can access the slots.
5. User can create bookings and access own bookings. Admin can access all bookings.
6. User can create, update and delete review. Admin can access all review and delete.
7. Payment system implemented.
8. Validation, Authentication and Authorization are properly used.

### Configuration
1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:
   ```bash
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=mongodb_url
    BCRYPT_SALT_ROUNDS=any_numeric_value
    JWT_ACCESS_SECRET=secret
    JWT_ACCESS_EXPIRES_IN=time
    SERVER_URL=live_or_local_url
    FRONTEND_URL=live_or_local_url
    STORE_ID=aamarpay_store_id
    SIGNATURE_KEY=aamarpay_signature_key
    PAYMENT_URL=aamarpay_payment_url
    PAYMENT_VERIFY_URL=aamarpay_payment_verify_url
   ```
3. Then the `.env` file needs to be connected with the `config` file.
   ```js
   import dotenv from 'dotenv';
   import path from 'path';
   dotenv.config({ path: path.join(process.cwd(), '.env') });
   export default {
     NODE_ENV: process.env.NODE_ENV,
     port: process.env.PORT,
     db_url: process.env.DATABASE_URL,
     bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
     jwt_access_secret: process.env.JWT_ACCESS_SECRET,
     jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRES_IN,
     server_url: process.env.SERVER_URL,
     frontend_url: process.env.FRONTEND_URL,
     store_id: process.env.STORE_ID,
     signature_key: process.env.SIGNATURE_KEY,
     payment_url: process.env.PAYMENT_URL,
     payment_verify_url: process.env.PAYMENT_VERIFY_URL,
   };
   ```

### Important Login credentials:
##### Admin: 
- email: admin@gmail.com 
- password: Admin@1234
##### Demo User: 
- email: sam@gmail.com 
- password: User@1234
