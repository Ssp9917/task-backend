import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/db-config.js';
import allRoutes from './src/routes/index.js';
import { Server } from 'socket.io';
// import { testNotification } from './src/utils/firebase.js';

connectDB()
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "*", // Allows all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


const server = http.createServer(app);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// Mount all routes under /api
app.use('/api/v1', allRoutes);


app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Stremo API',
    currentDateTime: new Date().toISOString(),
  });
});



// ****************** Socket code start ***********************
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

export { io }


// ****************** Socket code end *************************

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// testNotification("dl-QRwPVDgAV6HgOXSjlnS:APA91bGf0lOJNtm-5mPw-Cty2EA7iaZL5ipEvdu4FvW1LOZhcSaLgf-owLLzCXoWJYlL1mnsgNSik7_zXZ2E58qeeQf6zWag2x5DUmaNs5t40hBk8tUm57I")