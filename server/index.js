const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cache for API responses
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com']
    : ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

app.use('/api/', limiter);
app.use(express.json());

// Mock data
const mockWeatherData = {
  'london': {
    temperature: 15,
    humidity: 70,
    uvIndex: 3,
    cloudCover: 65,
    conditions: 'Cloudy',
    windSpeed: 12,
    visibility: 10
  },
  'new york': {
    temperature: 22,
    humidity: 60,
    uvIndex: 7,
    cloudCover: 25,
    conditions: 'Partly Cloudy',
    windSpeed: 15,
    visibility: 15
  },
  'tokyo': {
    temperature: 18,
    humidity: 65,
    uvIndex: 5,
    cloudCover: 40,
    conditions: 'Partly Cloudy',
    windSpeed: 10,
    visibility: 12
  }
};

// Mock fruit database
const fruitDatabase = [
  {
    id: 'beetroot',
    name: 'Beetroot',
    scientificName: 'Beta vulgaris',
    climateSpecialization: 'cloudy',
    phLevel: 5.8,
    acidity: 'medium',
    efficiency: 0.85,
    costPerKg: 0.12,
    powerDensityPerSqFt: 1.2,
    lowLightEfficiency: 0.90,
    highUVEfficiency: 0.65,
    photosyntheticPigments: {
      betalains: 50,
      flavonoids: 30
    }
  },
  {
    id: 'orange',
    name: 'Orange',
    scientificName: 'Citrus sinensis',
    climateSpecialization: 'sunny',
    phLevel: 3.5,
    acidity: 'high',
    efficiency: 0.92,
    costPerKg: 0.18,
    powerDensityPerSqFt: 1.8,
    lowLightEfficiency: 0.45,
    highUVEfficiency: 0.95,
    photosyntheticPigments: {
      carotenoids: 40,
      flavonoids: 25
    }
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Biophotonix API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/weather/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const cacheKey = `weather_${city}`;

  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  // Mock API response
  const weatherData = mockWeatherData[city] || {
    temperature: 20,
    humidity: 60,
    uvIndex: 5,
    cloudCover: 30,
    conditions: 'Partly Cloudy',
    windSpeed: 12,
    visibility: 10
  };

  const response = {
    city: req.params.city,
    ...weatherData,
    timestamp: new Date().toISOString(),
    source: 'mock'
  };

  // Cache the response
  cache.set(cacheKey, response);

  res.json(response);
});

app.get('/api/fruits/recommendations/:location', (req, res) => {
  const location = req.params.location.toLowerCase();
  const cacheKey = `recommendations_${location}`;

  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  // Get weather data for location
  const weatherData = mockWeatherData[location] || mockWeatherData['london'];

  // Calculate recommendations based on climate
  const recommendations = fruitDatabase.map(fruit => {
    let score = 0;

    if (weatherData.cloudCover > 50) {
      score += fruit.lowLightEfficiency * 40;
      if (fruit.climateSpecialization === 'cloudy') {
        score += 20;
      }
    } else {
      score += fruit.highUVEfficiency * 40;
      if (fruit.climateSpecialization === 'sunny') {
        score += 20;
      }
    }

    score += fruit.efficiency * 15;
    score += (1 - Math.min(fruit.costPerKg / 0.5, 1)) * 10;

    return {
      ...fruit,
      climateScore: Math.round(score)
    };
  }).sort((a, b) => b.climateScore - a.climateScore);

  const response = {
    location: req.params.location,
    weather: weatherData,
    recommendations: recommendations.slice(0, 3),
    timestamp: new Date().toISOString()
  };

  // Cache the response
  cache.set(cacheKey, response);

  res.json(response);
});

app.post('/api/calculate-energy', (req, res) => {
  const { fruitType, panelArea, location, deviceCategory } = req.body;

  // Find fruit data
  const fruit = fruitDatabase.find(f => f.id === fruitType) || fruitDatabase[0];

  // Get weather data
  const weatherData = mockWeatherData[location.toLowerCase()] || mockWeatherData['london'];

  // Calculate power generation
  const basePower = fruit.powerDensityPerSqFt * panelArea;
  const climateFactor = weatherData.cloudCover > 50
    ? fruit.lowLightEfficiency
    : fruit.highUVEfficiency;

  const averagePower = basePower * climateFactor;
  const dailyGeneration = averagePower * 6; // 6 hours average daylight

  // Installation costs
  const juiceRequired = panelArea * 175; // ml per sq ft
  const resinRequired = juiceRequired * 0.5;
  const installationCost = (juiceRequired / 1000) * fruit.costPerKg * 2 + (resinRequired / 1000) * 5;

  const response = {
    calculations: {
      averagePower: averagePower.toFixed(2),
      dailyGeneration: dailyGeneration.toFixed(1),
      monthlyGeneration: (dailyGeneration * 30).toFixed(0),
      juiceRequired: juiceRequired.toFixed(0),
      resinRequired: resinRequired.toFixed(0),
      installationCost: installationCost.toFixed(2),
      lifespan: 18,
      efficiency: (fruit.efficiency * 100).toFixed(0),
      climateFactor: (climateFactor * 100).toFixed(0)
    },
    inputs: { fruitType, panelArea, location, deviceCategory },
    timestamp: new Date().toISOString()
  };

  res.json(response);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Biophotonix API server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;