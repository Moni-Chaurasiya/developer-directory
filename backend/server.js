const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes =require('./routes/auth')
const developerRoutes = require('./routes/developers');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({

  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
 // origin:  'http://localhost:5173',
  Credentials: true
}
));
app.use(express.json());
app.use(express.urlencoded({extented: true}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',authRoutes)
app.use('/api/developers', developerRoutes);

app.get('/', (req,res)=>{
  res.status(200).json({
    success:true,
    message:'Server is running'
  })
})


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});