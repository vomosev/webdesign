const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { pool, checkDatabaseConnection } = require('./config/db');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      /\.geo-drops\.com$/,
      'http://localhost:3000',
      'http://localhost:5086'
    ];
    
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return pattern === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session store configuration
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, pool);

// Session configuration
app.use(
  session({
    key: 'webdesign_session',
    secret: process.env.SESSION_SECRET || 'fallback-secret-key-change-in-production',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
  })
);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'CORS Error',
      message: 'Origin not allowed'
    });
  }
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Database connection check and server startup
const startServer = async () => {
  try {
    await checkDatabaseConnection();
    console.log('Database connection verified successfully');
    
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server gracefully...');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server gracefully...');
  await pool.end();
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;