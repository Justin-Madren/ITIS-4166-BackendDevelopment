import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/postRoutes.js';
import { use } from 'react';


const app = express();
const PORT = process.env.PORT || 3000;
const enviroment = process.env.NODE_ENV;


app.use(express.json());
app.use(morgan('tiny'));


app.use('/api/posts', postRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    if(!err.status){
      err.status = 500;
      err.message = 'Internal Server Error';
    }
    res.status(err.status).json({ error: err.message });
});

if(enviroment !== 'test'){
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;