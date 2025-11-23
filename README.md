# WanderLust - Airbnb Clone

**Full-Stack Web Application**
<br>
*A comprehensive Airbnb clone built from scratch, integrating frontend, backend, and database. This project is structured to reflect a real-world full-stack application, covering everything from API design and database relationships to frontend integration and deployment.*

---

## 🚀 Features

- **User Authentication**: Secure signup and login with Passport.js and local-mongoose
- **Listings Management**: Create, read, update, and delete property listings
- **Image Uploads**: Upload property images to Cloudinary with automatic optimization
- **Reviews & Ratings**: Leave detailed reviews with 1-5 star ratings on listings
- **Geolocation**: MapTiler integration for displaying property locations on interactive maps
- **Session Management**: Persistent user sessions with MongoDB
- **Flash Messages**: Real-time feedback for all user actions
- **Responsive Design**: Bootstrap 5-based responsive UI for all devices
- **Error Handling**: Comprehensive error handling and data validation with Joi

## 🛠️ Tech Stack

### Backend
- **Node.js** (22.19.0) - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware

### Frontend
- **EJS** - Server-side templating engine
- **Bootstrap 5** - CSS framework
- **MapTiler SDK** - Interactive mapping
- **CSS3** - Custom styling with animations

### External Services
- **Cloudinary** - Cloud image storage and optimization
- **MongoDB Atlas** - Cloud database hosting
- **MapTiler** - Geolocation and mapping services

## 📋 Prerequisites

- Node.js 22.19.0 or higher
- npm or yarn package manager
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)
- MapTiler account (free tier available)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd airbnb-clone/project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root directory:

```env
# Database
ATLAS_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Session Secret
SECRET=your_super_secret_key_here

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

# MapTiler Configuration
MAPTILER_API_KEY=your_maptiler_api_key

# Environment
NODE_ENV=development
```

### 4. Start the Development Server
```bash
node app.js
```

The application will be running at `http://localhost:8080`

## 📁 Project Structure

```
project/
├── app.js                    # Main application entry point
├── package.json              # Dependencies and scripts
├── schema.js                 # Joi validation schemas
├── middleware.js             # Custom middleware
├── cloudConfig.js            # Cloudinary configuration
├── test.js                   # Testing utilities
│
├── controllers/              # Route controllers (business logic)
│   ├── listings.js
│   ├── reviews.js
│   └── user.js
│
├── models/                   # Mongoose data models
│   ├── listing.js           # Property listing schema
│   ├── review.js            # Review schema
│   └── user.js              # User schema with authentication
│
├── routes/                   # Express routes
│   ├── listing.js           # Listing CRUD operations
│   ├── review.js            # Review operations
│   └── user.js              # Authentication routes
│
├── views/                    # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs  # Main layout template
│   ├── listings/
│   │   ├── index.ejs        # Listings list view
│   │   ├── show.ejs         # Listing details view
│   │   ├── new.ejs          # Create listing form
│   │   └── edit.ejs         # Edit listing form
│   ├── user/
│   │   ├── signup.ejs       # User registration form
│   │   └── login.ejs        # User login form
│   ├── includes/
│   │   ├── navbar.ejs       # Navigation component
│   │   ├── footer.ejs       # Footer component
│   │   ├── flash.ejs        # Flash messages component
│   │   ├── map.ejs          # Map component
│   │   └── review.ejs       # Review component
│   └── error.ejs            # Error page
│
├── public/                   # Static files
│   ├── css/
│   │   ├── style.css        # Main styles
│   │   └── rating.css       # Rating styles
│   └── js/
│       ├── script.js        # Main scripts
│       ├── map.js           # Map initialization
│       └── search.js        # Search functionality
│
├── utils/                    # Utility functions
│   ├── wrapAsync.js         # Error wrapper for async functions
│   ├── expressError.js      # Custom error class
│   └── geocoding.js         # Geolocation utilities
│
└── init/                     # Database initialization
    ├── data.js              # Sample data
    └── index.js             # Init script
```

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  _listings: [ObjectId] // References to listings created by user
}
```

### Listing Model
```javascript
{
  title: String (required),
  description: String (required),
  image: {
    url: String,
    filename: String
  },
  price: Number (required, min: 0),
  location: String (required),
  country: String (required),
  reviews: [ObjectId], // Array of review references
  owner: ObjectId, // Reference to User
  geometry: {
    type: "Point", // GeoJSON format
    coordinates: [longitude, latitude]
  }
}
```

### Review Model
```javascript
{
  comment: String (required),
  rating: Number (required, min: 1, max: 5),
  author: ObjectId, // Reference to User
  createdAt: Date (default: now)
}
```

## 🔐 Authentication & Authorization

- **Passport.js** with Local Strategy for user authentication
- **passport-local-mongoose** for password hashing and user management
- Secure session management with MongoDB store
- 7-day session expiration
- httpOnly cookies for enhanced security

## 📝 API Routes

### Listings Routes
**Retrieve all listings**
```
GET /listings
```
Display all available property listings

**Create listing form**
```
GET /listings/new
```
Render the form to create a new listing

**Create new listing**
```
POST /listings
```
Add a new property listing to the database

**Get listing details**
```
GET /listings/:id
```
View complete details of a specific listing including reviews and map

**Edit listing form**
```
GET /listings/:id/edit
```
Render the form to edit an existing listing

**Update listing**
```
PUT /listings/:id
```
Update listing information in the database

**Delete listing**
```
DELETE /listings/:id
```
Remove a listing from the database

### Reviews Routes
**Add review to listing**
```
POST /listings/:id/reviews
```
Add a new review and rating to a specific listing

**Delete review**
```
DELETE /listings/:id/reviews/:reviewId
```
Remove a review from a listing

### User Routes
**Show signup form**
```
GET /user/signup
```
Render the user registration form

**Register new user**
```
POST /user/signup
```
Create a new user account with username, email, and password

**Show login form**
```
GET /user/login
```
Render the user login form

**Authenticate user**
```
POST /user/login
```
Log in an existing user and create a session

**Logout user**
```
GET /user/logout
```
End the user session and log out

## ✨ Key Features in Detail

### Image Upload
- Integrated with Cloudinary for reliable cloud storage
- Automatic image resizing and optimization
- Secure file management with multer

### Map Integration
- Real-time map display using MapTiler SDK
- GeoJSON format for geolocation data
- Interactive map on listing details page

### Form Validation
- Server-side validation using Joi schemas
- Client-side validation for better UX
- Custom error messages for user feedback

### Flash Messaging System
- Success messages for completed actions
- Error messages for failed operations
- Auto-dismissible alerts with Bootstrap

## 🚀 Getting Started Quickly

1. **Set up environment variables** (as shown in Installation section)
2. **Start MongoDB Atlas cluster** and ensure connection
3. **Verify Cloudinary and MapTiler credentials** are correct
4. **Install dependencies**: `npm install`
5. **Start server**: `node app.js`
6. **Visit**: `http://localhost:8080`
7. **Create account** or use demo user for testing
8. **Start listing properties** and exploring!

## 🐛 Error Handling

The application includes comprehensive error handling:
- **Validation Errors**: Joi schema validation for all forms
- **Authentication Errors**: Flash messages displayed on login/signup failure
- **Authorization Errors**: Protected routes with user verification
- **404 Errors**: Custom "Page Not Found" page
- **Server Errors**: Centralized error middleware with proper status codes

## 📸 Working with Images

1. Images are uploaded via multer middleware
2. Stored securely in Cloudinary
3. URLs retrieved for database storage
4. Optimized for web delivery automatically

## 🗺️ Geolocation Features

- Store location coordinates as GeoJSON
- Display properties on interactive maps
- Filter and search by location
- Geocoding support for address-to-coordinates conversion

## 🔄 Session Management

- Sessions stored in MongoDB collection
- 14-day TTL (Time To Live) for automatic cleanup
- Secure cookie configuration with httpOnly flag
- 7-day user session expiration for security

## 📝 Validation Rules

### Listings
- Title: Required, string
- Description: Required, string
- Price: Required, positive number
- Location: Required, string
- Country: Required, string
- Image: URL from Cloudinary

### Reviews
- Comment: Required, string
- Rating: Required, integer 1-5

### Users
- Username: Required, unique
- Email: Required, unique, valid email
- Password: Required, minimum 6 characters

## 🎯 Best Practices Implemented

- **Async Error Handling**: Using wrapAsync utility for error catching
- **Custom Error Class**: ExpressError for consistent error responses
- **Environment Variables**: Sensitive data in .env file
- **Code Organization**: Separation of concerns with MVC pattern
- **Security**: Password hashing, httpOnly cookies, session management
- **Responsive Design**: Mobile-first approach with Bootstrap

## 🚀 Deployment Considerations

- Use `NODE_ENV=production` for production
- Ensure `.env` file is never committed to version control
- Set up proper database backups
- Configure CORS if building separate frontend
- Use reverse proxy (nginx) for production
- Enable HTTPS with SSL certificates

## 📚 Learning Outcomes

This project demonstrates:
- Full-stack web development with Node.js and Express
- MongoDB database design and queries
- User authentication and authorization
- RESTful API design
- Real-world project structure and best practices
- Integration with third-party services (Cloudinary, MapTiler)
- Responsive web design
- Error handling and validation

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch
- Submit pull requests with improvements
- Report bugs and suggest features

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

## 👨‍💻 Author

**Govind Choudhary**

---

## 🔗 Useful Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Passport.js Documentation](https://www.passportjs.org/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MapTiler Documentation](https://docs.maptiler.com/)

---

**Happy Building! 🏠✨**
