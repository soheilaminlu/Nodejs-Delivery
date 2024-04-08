import express from "express";
import App from './services/ExpressApp';
import dbConnection from "./services/DataBase";
import { PORT } from "./config";


const StartServer = async () => {
    const app = express();
    await dbConnection();
    await App(app);
    app.listen( PORT, () => {
        console.log(`Server Connected ON ${PORT}`);
    });
};


StartServer();