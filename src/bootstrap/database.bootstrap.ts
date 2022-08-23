import mongoose from 'mongoose';
import yenv from 'yenv';

const env = yenv();

export const DBconnection = async () => {

    try {
        const connectionString = `mongodb+srv://${env.DATABASE.MONGO.USER}:${env.DATABASE.MONGO.PASSWORD}@${env.DATABASE.MONGO.HOST}/${env.DATABASE.MONGO.DB_NAME}`;
        const options: mongoose.ConnectOptions = {
            maxPoolSize: 10,
        };

        await mongoose.connect(connectionString, options);
        console.log('CONNECTION SUCCESSFULL !!!');

    } catch (error) {
        throw new Error();
    }
};