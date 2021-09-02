require('dotenv').config();
import mongoose from "mongoose";

const options = {
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

function connectToMongoDb(mongoUser: string | undefined, mongoPassword: string | undefined, mongoHost: string | undefined, mongoDB: string | undefined) {
    if (mongoUser || mongoPassword){
        var mongoConnection = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDB}?retryWrites=true&w=majority`;
    }
    else if(mongoHost && mongoDB){
        var mongoConnection = `mongodb://${mongoHost}/${mongoDB}`;
    }
    else{
        var mongoConnection = 'mongodb://localhost:27017/test'
    }
    mongoose.connect(mongoConnection,options)
    .catch((err:any) => {
        console.error(`Failed to connect to MongoDB: ${err.message}`);
    });
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

connectToMongoDb(process.env.MONGO_USER, process.env.MONGO_PASSWORD, process.env.MONGO_HOST, process.env.MONGO_DB);

export {mongoose};
