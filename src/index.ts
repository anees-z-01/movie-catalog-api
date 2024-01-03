import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const startServer = () => {
    const port = process.env.PORT;

    app.listen(port, () => {
        console.log('Server has been started on port: ' + port);
    });
};

startServer();
