const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('🔍 Attempting to connect to MongoDB Atlas...');
        console.log('📍 URI:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
        console.log(`📊 Database Name: ${conn.connection.name}`);
        
    } catch (error) {
        console.error(`❌ MongoDB Atlas Connection Error:`);
        console.error(`   Message: ${error.message}`);
        console.error(`   Full Error:`, error);
        
        // Don't exit in development for debugging
        if (process.env.NODE_ENV !== 'development') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
