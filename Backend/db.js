const mongoose = require('mongoose');

async function DatabaseConnection(mongoURI) {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(mongoURI, options);
        console.log('Database Connection in ', mongoURI);
    } catch (error) {
        if (error.name === 'MongoNetworkError') {
            console.error('Network error occurred. Check your MongoDB server.');
        } else if (error.name === 'MongooseServerSelectionError') {
            console.error('Server selection error. Ensure MongoDB is running and accessible.');
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
    
    const db = mongoose.connection;
    
    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });
    
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
    
    db.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });
    
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose connection is disconnected due to application termination');
            process.exit(0);
        });
    });
}

module.exports = DatabaseConnection;
