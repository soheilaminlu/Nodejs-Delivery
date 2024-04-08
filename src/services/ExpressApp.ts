import express, { Application , Request , Response } from 'express';
import { AdminRoute, VandorRoute ,  CustomerRoute, ShoppingRoute } from '../routes';
import path from 'path'






export default async (app:Application) => {

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static(path.join(__dirname , 'images')))
    
    
    app.use('/admin' , AdminRoute);
    app.use('/vandor' , VandorRoute);
    app.use('/customer' , CustomerRoute );
    app.use(ShoppingRoute)
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, World!');
    });
    
    return app;
}




