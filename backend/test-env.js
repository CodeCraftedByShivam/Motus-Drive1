require('dotenv').config();

console.log('🔍 Testing environment variables:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'FOUND' : 'NOT FOUND');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'FOUND' : 'NOT FOUND');

if (process.env.MONGODB_URI) {
    // Hide password for security
    const safeUri = process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@');
    console.log('Safe URI:', safeUri);
} else {
    console.log('❌ MONGODB_URI not found in .env file');
}
