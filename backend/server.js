const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes =require('./routes/auth')
const developerRoutes = require('./routes/developers');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

console.log('🔍 Environment Variables Check:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not Set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not Set');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || '❌ NOT SET');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ NOT SET');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ NOT SET');
console.log('---');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({

  //origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  origin:  'http://localhost:5173',
  Credentials: true
}
));
app.use(express.json());
app.use(express.urlencoded({extented: true}));


app.use('/api/auth',authRoutes)
app.use('/api/developers', developerRoutes);

app.get('/api/test-cloudinary', (req, res) => {
     const { cloudinary } = require('./config/cloudinary');
     res.json({
       configured: !!cloudinary.config().cloud_name,
       cloudName: cloudinary.config().cloud_name
     });
   });

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