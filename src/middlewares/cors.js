const CORS_WHITE_LIST = ['http://89.111.170.6', 'https://89.111.170.6', 'http://localhost:3000', 'http://localhost:5173'];

export const corsMiddleware = (req, res, next) => {
  const requestOrigin = req.headers.origin;
  
  if (CORS_WHITE_LIST.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin)
  }

  next();
}