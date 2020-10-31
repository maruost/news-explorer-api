// JWT for dev mode
module.exports.jwtDev = "dev-secret";

// MongoDB adress for dev mode
module.exports.mongoAdress = "mongodb://localhost:27017/newsdb";

//cors options configuration
module.exports.corsOptions = {
  origin: [
    "http://localhost:8080",
    "https://maruost.github.io/news-frontend/",
    "https://www.api.my-news-explorer.gq",
    "https://api.my-news-explorer.gq",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "origin", "x-access-token"],
  credentials: true,
};
