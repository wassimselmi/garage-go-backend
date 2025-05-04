// CONFIGURATION

export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/garage-go',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your-secret-key-here',
      expiresIn: process.env.JWT_EXPIRATION || '24h',
    },
  });