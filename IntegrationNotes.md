# Integration Notes for webdesign

## Overview

**webdesign** is a modern web design showcase site emphasizing clean lines and minimalist aesthetics. The application features a full-stack architecture with Next.js App Router for the frontend, Express for the backend API, and MySQL for persistent data storage. The platform includes user authentication, portfolio management, contact form handling, and a protected dashboard for authenticated users.

The application is designed to run as a single unified deployment with the Express backend serving as the API layer and Next.js handling the frontend rendering and routing.

## Prerequisites

Before setting up this application, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn**
- **MySQL** (v8.0 or higher)
- **PM2** (for production deployment): `npm install -g pm2`
- **Git** (for version control)
- **SSL/TLS certificates** (for production HTTPS - see Production Considerations)

## Installation

### 1. Clone or Extract the Project

```bash
cd webdesign
```

### 2. Install Dependencies

Install all required Node.js packages for both frontend and backend:

```bash
npm install
```

This will install the following key dependencies:
- `next`, `react`, `react-dom` (frontend framework)
- `express`, `cors`, `cookie-parser` (backend server)
- `mysql2` (MySQL database driver)
- `bcrypt` (password hashing)
- `express-session` (session management)
- `dotenv` (environment variable management)

### 3. Database Setup

Create the MySQL database and tables using the provided schema:

```bash
# Log into MySQL as root or admin user
mysql -u root -p

# Create the database
CREATE DATABASE webdesign_db;

# Create a dedicated user (recommended for security)
CREATE USER 'webdesign_user'@'localhost' IDENTIFIED BY 'your-secret-password';
GRANT ALL PRIVILEGES ON webdesign_db.* TO 'webdesign_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Import the schema
mysql -u webdesign_user -p webdesign_db < schema.sql
```

The `schema.sql` file creates:
- **users table**: Stores user accounts with id, email, password_hash, full_name, created_at
- **sessions table**: Stores express-session data for authentication persistence

### 4. Environment Configuration

Copy the example environment file and configure it with your actual values:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configuration (see Environment Variables section below).

## Environment Variables

Configure the following environment variables in your `.env` file:

- **DB_HOST**: MySQL database host
  - Example: `localhost`
  - Description: The hostname or IP address where your MySQL server is running
  
- **DB_USER**: MySQL database user
  - Example: `webdesign_user`
  - Description: The MySQL user account with access to the webdesign database
  
- **DB_PASSWORD**: MySQL database password
  - Example: `your-secret-password`
  - Description: The password for the MySQL user account (keep this secure)
  
- **DB_NAME**: MySQL database name
  - Example: `webdesign_db`
  - Description: The name of the MySQL database containing the application tables
  
- **BACKEND_PORT**: Port for backend API server
  - Example: `5086`
  - Description: The port number where the Express backend API will listen for requests
  
- **SESSION_SECRET**: Secret key for session encryption
  - Example: `your-session-secret-key-here`
  - Description: A strong random string used to sign session cookies (generate a secure random string for production)
  
- **NODE_ENV**: Environment mode
  - Example: `production`
  - Description: Sets the Node.js environment mode (`development`, `production`, or `test`)

## Running the Application

### Development Mode

For local development with hot-reloading:

**Terminal 1 - Start the Backend API:**
```bash
npm run server
```

This starts the Express server on the port specified in `BACKEND_PORT` (default: 5086).

**Terminal 2 - Start the Next.js Frontend:**
```bash
npm run dev
```

This starts the Next.js development server on `http://localhost:3000` (default Next.js port).

The Next.js configuration (`next.config.js`) automatically proxies API requests to the backend server.

### Production Mode

**Option 1: Using PM2 (Recommended)**

PM2 provides process management, auto-restart, and monitoring:

```bash
# Build the Next.js application
npm run build

# Start both frontend and backend with PM2
pm2 start ecosystem.config.js

# View running processes
pm2 list

# View logs
pm2 logs webdesign

# Monitor processes
pm2 monit

# Stop the application
pm2 stop webdesign

# Restart the application
pm2 restart webdesign
```

The `ecosystem.config.js` configures PM2 to run the application on port 5086 with proper environment variables.

**Option 2: Using the START.sh Script**

For simpler deployments, use the provided startup script:

```bash
# Make the script executable
chmod +x START.sh

# Run the script
./START.sh
```

This launches the backend API server as a background process. You'll need to start Next.js separately:

```bash
npm start
```

## Project Structure

```
webdesign/
├── app/                          # Next.js App Router pages
│   ├── layout.jsx               # Root layout with global structure
│   ├── page.jsx                 # Homepage with hero and portfolio preview
│   ├── globals.css              # Global styles and CSS reset
│   ├── login/page.jsx           # Login page
│   ├── signup/page.jsx          # User registration page
│   ├── dashboard/page.jsx       # Protected user dashboard
│   ├── portfolio/page.jsx       # Portfolio showcase page
│   ├── about/page.jsx           # About page with philosophy
│   └── contact/page.jsx         # Contact form page
├── components/                   # Reusable React components
│   ├── Hero.jsx                 # Hero section with typography
│   ├── PortfolioGrid.jsx        # Portfolio project grid
│   ├── ProjectCard.jsx          # Individual project card
│   ├── CTASection.jsx           # Call-to-action sections
│   ├── AuthForm.jsx             # Reusable auth form
│   ├── DashboardNav.jsx         # Dashboard navigation
│   ├── DesignList.jsx           # Design project management
│   ├── FilterBar.jsx            # Portfolio filters
│   ├── TeamSection.jsx          # Team member display
│   ├── ContactForm.jsx          # Contact form component
│   ├── Header.jsx               # Site-wide header
│   └── Footer.jsx               # Site-wide footer
├── server/                       # Express backend
│   ├── index.js                 # Express server entry point
│   ├── config/
│   │   └── db.js                # MySQL connection pool config
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── portfolio.js         # Portfolio CRUD endpoints
│   │   └── contact.js           # Contact form endpoint
│   └── controllers/
│       ├── authController.js    # Auth business logic
│       ├── portfolioController.js # Portfolio business logic
│       └── contactController.js  # Contact form logic
├── public/
│   └── images/
│       └── logo.svg             # Minimalist brand logo
├── package.json                  # Dependencies and scripts
├── next.config.js               # Next.js configuration
├── ecosystem.config.js          # PM2 deployment config
├── schema.sql                   # Database schema
├── START.sh                     # Startup script
├── .env.example                 # Environment variable template
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

### Key Directories and Files

- **app/**: Contains all Next.js pages using the App Router pattern. Each folder with a `page.jsx` becomes a route.
- **components/**: Reusable React components following minimalist design principles with clean line aesthetics.
- **server/**: Complete Express backend with MVC-style architecture (routes, controllers, middleware).
- **server/config/db.js**: Exports a MySQL connection pool using `mysql2/promise` for async/await query execution.
- **server/middleware/auth.js**: Provides `requireAuth` and `optionalAuth` middleware for protecting routes.
- **schema.sql**: Defines the complete database schema including users and sessions tables.
- **next.config.js**: Configures the backend API proxy to forward `/api/*` requests to the Express server.

## Next Steps / Production Considerations

### Security Hardening

1. **Generate Strong Secrets**: Replace placeholder values in `.env` with cryptographically secure random strings:
   ```bash
   # Generate a secure session secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **SSL/TLS Certificates**: The Express server (`server/index.js`) is configured to use HTTPS. Obtain and configure certificates:
   - Place certificate files in a secure location
   - Update `server/index.js` to reference certificate paths
   - For development, consider using self-signed certificates
   - For production, use Let's Encrypt or a commercial CA

3. **Environment Variables**: Never commit `.env` files to version control. Use environment-specific configurations for staging and production.

4. **Database Security**: 
   - Use dedicated database users with minimal required privileges
   - Enable MySQL SSL/TLS connections for remote databases
   - Regularly backup the database
   - Consider implementing connection pooling limits

### CORS Configuration

The backend server (`server/index.js`) is configured with CORS for `*.geo-drops.com`. Update this in production:

```javascript
// In server/index.js, modify CORS settings:
app.use(cors({
  origin: 'https://yourdomain.com', // Your actual domain
  credentials: true
}));
```

### Session Storage

The application uses MySQL for session storage via `express-session`. For high-traffic production deployments, consider:
- Redis for session storage (faster, better scalability)
- Configuring session cleanup jobs to remove expired sessions
- Setting appropriate session expiration times

### Deployment Checklist

- [ ] Configure production database with backups
- [ ] Set `NODE_ENV=production` in environment
- [ ] Install and configure SSL/TLS certificates
- [ ] Update CORS origins for production domain
- [ ] Configure firewall rules (allow only necessary ports)
- [ ] Set up monitoring and logging (PM2 provides basic monitoring)
- [ ] Configure reverse proxy (Nginx or Apache) if needed
- [ ] Set up automated database backups
- [ ] Implement rate limiting on API endpoints
- [ ] Configure CDN for static assets
- [ ] Set up health monitoring for `/health` endpoint

### Performance Optimization

- **Next.js Build**: Run `npm run build` to create optimized production bundles
- **Static Assets**: Serve static files through CDN or optimized web server
- **Database Indexing**: Add indexes on frequently queried columns (email, created_at)
- **Caching**: Implement caching strategies for portfolio data and public pages
- **Image Optimization**: Use Next.js Image component for automatic optimization

### Monitoring and Maintenance

- **PM2 Monitoring**: Use `pm2 monit` for real-time process monitoring
- **Log Rotation**: Configure PM2 or system-level log rotation to prevent disk space issues
- **Health Checks**: Monitor the `/health` endpoint for backend availability
- **Error Tracking**: Consider integrating Sentry or similar error tracking service
- **Database Maintenance**: Schedule regular MySQL optimization and cleanup tasks

### Scaling Considerations

- **Horizontal Scaling**: Use PM2 cluster mode to utilize all CPU cores
- **Load Balancing**: Deploy multiple instances behind a load balancer (Nginx, HAProxy)
- **Database Replication**: Set up MySQL read replicas for high-traffic scenarios
- **Static Asset Delivery**: Use CDN for Next.js static assets and images
- **Session Management**: Migrate to Redis for distributed session storage across multiple servers

## Database Provisioning

A mysql database has been automatically provisioned for this app.

- **Database:** webdesign
- **Host:** testdb.gridiron-app.com
- **Port:** 3306
- **User:** webdesign
- **Credentials stored in Vault at:** `secret/data/mysql/webdesign`

Retrieve the password securely from Vault and set it as an environment variable (e.g. `DB_PASSWORD`) in your deployment settings — do not commit it to source control.
