# Clean Lines Web Design

A modern web design showcase site emphasizing clean lines and minimalist aesthetics. Built with Next.js App Router for the frontend and Express backend with MySQL for user authentication and content management.

## Features

- **Modern Stack**: Next.js 14+ with App Router, Express.js backend, MySQL database
- **Clean Design**: Minimalist interface with strong focus on clean lines and typography
- **User Authentication**: Secure session-based authentication with bcrypt password hashing
- **Portfolio Management**: Create, read, update, and delete design projects
- **Contact Form**: Visitor contact submissions with database storage
- **Responsive Layout**: Mobile-first design with clean breakpoints
- **Production Ready**: PM2 process management and HTTPS support

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Custom CSS with clean line-based design system
- **UI Components**: Custom React components with minimalist aesthetic

### Backend
- **Runtime**: Node.js with Express.js
- **Session Management**: express-session with MySQL store
- **Authentication**: bcrypt for password hashing
- **CORS**: Configured for *.geo-drops.com

### Database
- **Database**: MySQL
- **Connection**: mysql2 with connection pooling

## Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── layout.jsx               # Root layout component
│   ├── page.jsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── login/page.jsx           # Login page
│   ├── signup/page.jsx          # Signup page
│   ├── dashboard/page.jsx       # Protected dashboard
│   ├── portfolio/page.jsx       # Portfolio showcase
│   ├── about/page.jsx           # About page
│   └── contact/page.jsx         # Contact page
├── components/                   # Reusable React components
│   ├── Header.jsx               # Site header
│   ├── Footer.jsx               # Site footer
│   ├── Hero.jsx                 # Hero section
│   ├── PortfolioGrid.jsx        # Portfolio grid
│   ├── ProjectCard.jsx          # Project card
│   ├── CTASection.jsx           # Call-to-action section
│   ├── AuthForm.jsx             # Authentication form
│   ├── DashboardNav.jsx         # Dashboard navigation
│   ├── DesignList.jsx           # Design list management
│   ├── FilterBar.jsx            # Filter controls
│   ├── TeamSection.jsx          # Team display
│   └── ContactForm.jsx          # Contact form
├── server/                       # Express backend
│   ├── index.js                 # Server entry point
│   ├── config/
│   │   └── db.js                # Database configuration
│   ├── middleware/
│   │   └── auth.js              # Auth middleware
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── portfolio.js         # Portfolio routes
│   │   └── contact.js           # Contact routes
│   └── controllers/
│       ├── authController.js    # Auth logic
│       ├── portfolioController.js # Portfolio logic
│       └── contactController.js # Contact logic
├── public/
│   └── images/
│       └── logo.svg             # Brand logo
├── schema.sql                    # Database schema
├── package.json                  # Dependencies
├── next.config.js                # Next.js configuration
├── ecosystem.config.js           # PM2 configuration
├── START.sh                      # Backend startup script
├── .env.example                  # Environment template
└── .gitignore                    # Git ignore rules
```

## Prerequisites

- Node.js 18.x or higher
- MySQL 8.x or higher
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=webdesign_db
   BACKEND_PORT=5087
   SESSION_SECRET=your-super-secret-session-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Set up the database**
   
   Create the database:
   ```bash
   mysql -u root -p -e "CREATE DATABASE webdesign_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```
   
   Import the schema:
   ```bash
   mysql -u root -p webdesign_db < schema.sql
   ```

5. **For HTTPS in production (optional)**
   
   Place SSL certificate files in the project root:
   - `server.crt` - SSL certificate
   - `server.key` - SSL private key

## Development

### Start the backend server
```bash
npm run server
```
The Express API will run on `http://localhost:5087` (or your configured BACKEND_PORT)

### Start the Next.js development server
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`

### Run both concurrently
You can run both servers in separate terminal windows or use a process manager.

## Production Deployment

### Using PM2 (Recommended)

1. **Install PM2 globally**
   ```bash
   npm install -g pm2
   ```

2. **Build the Next.js application**
   ```bash
   npm run build
   ```

3. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   ```

4. **Manage the application**
   ```bash
   # View logs
   pm2 logs

   # Restart
   pm2 restart webdesign-site

   # Stop
   pm2 stop webdesign-site

   # Monitor
   pm2 monit
   ```

5. **Enable PM2 startup on boot**
   ```bash
   pm2 startup
   pm2 save
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the backend**
   ```bash
   chmod +x START.sh
   ./START.sh
   ```

3. **Start the Next.js server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Portfolio
- `GET /api/portfolio` - Get all projects
- `GET /api/portfolio/:id` - Get single project
- `POST /api/portfolio` - Create new project (auth required)
- `PUT /api/portfolio/:id` - Update project (auth required)
- `DELETE /api/portfolio/:id` - Delete project (auth required)

### Contact
- `POST /api/contact` - Submit contact form

## Database Schema

### Users Table
- `id` - Primary key (auto-increment)
- `email` - Unique email address
- `password_hash` - Bcrypt hashed password
- `full_name` - User's full name
- `created_at` - Timestamp of registration

### Sessions Table
- `session_id` - Primary key
- `expires` - Session expiration timestamp
- `data` - Serialized session data

### Portfolio Projects Table
- Created dynamically through API endpoints
- Stores project information, images, and metadata

### Contact Submissions Table
- Stores contact form submissions with timestamp

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL database host | `localhost` |
| `DB_USER` | MySQL database user | `webdesign_user` |
| `DB_PASSWORD` | MySQL database password | `secure_password` |
| `DB_NAME` | MySQL database name | `webdesign_db` |
| `BACKEND_PORT` | Port for Express API | `5087` |
| `SESSION_SECRET` | Secret for session encryption | `random-secret-string` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## Security Considerations

- All passwords are hashed using bcrypt with 10 salt rounds
- Session-based authentication with secure cookies
- HTTPS support in production with SSL certificates
- CORS configured for specific domain pattern (*.geo-drops.com)
- SQL injection protection through parameterized queries
- Environment variables for sensitive configuration
- `.gitignore` configured to exclude sensitive files

## Design Philosophy

This project emphasizes:
- **Clean Lines**: Minimalist borders, separators, and geometric layouts
- **Typography**: System fonts with clear hierarchy and generous spacing
- **White Space**: Abundant breathing room between elements
- **Monochromatic Palette**: Blacks, whites, and grays for timeless aesthetic
- **Subtle Interactions**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach with clean breakpoints

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `systemctl status mysql`
- Check credentials in `.env` file
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`
- Test connection: `npm run server` and check console output

### Port Already in Use
- Change `BACKEND_PORT` in `.env` file
- Check for processes using port: `lsof -i :5087`
- Kill process if needed: `kill -9 <PID>`

### Session Issues
- Clear browser cookies
- Verify `SESSION_SECRET` is set in `.env`
- Check sessions table in database

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For issues, questions, or contributions, please contact the development team or open an issue in the repository.