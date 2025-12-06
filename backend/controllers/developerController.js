const Developer = require('../models/Developer');
const path = require('path');
const fs = require('fs');
exports.createDeveloper = async (req, res, next) => {
  try {
    const { fullName, role, techStack, experience, description } = req.body;
    //const photo= req.file ? req.file.path : '' ;
     const photo = req.file ? `/uploads/${req.file.filename}` : '';
    const developer = await Developer.create({
      fullName,
      role,
      techStack,
      experience,
      description: description || 'No description provide',
      photo,
      createdBy:req.user._id
    });

    res.status(201).json({ success: true, message: 'Developer Creted successfully', data: developer });
  } catch (error) {
    next(error);
  }
};

exports.updateDeveloper=async(req,res,next)=>{
  try {
    const {fullName,role,techStack,experience,description}= req.body;
    let developer= await Developer.findById(req.params.id);
    if(!developer){
      return res.status(404).json({
        success:false,
        message:'Developer not found'
      })
    }

    developer.fullName=fullName ||  developer.fullName;
    developer.role=role || developer.role;
    developer.techStack = techStack || developer.techStack;
    developer.experience= experience !==undefined ? experience : developer.experience;
    developer.description= description || developer.description;

    if(req.file){
     // developer.photo=req.file.path;
     if (developer.photo) {
        const oldPhotoPath = path.join(__dirname, '..', developer.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      developer.photo = `/uploads/${req.file.filename}`;

    }
    await developer.save();
    res.status(200).json({
      success:true,
      message:'Developer updated successfully',
      data: developer
    })
  } catch (error) {
    next(error);
  }
}

exports.deleteDeveloper= async (req,res,next)=>{
  try {
    const developer= await Developer.findById(req.params.id);
    if(!developer){
      return res.status(404).json({
        success:false,
        message: 'Developer not found'
      })
    }
   
    if (developer.photo) {
      const photoPath = path.join(__dirname, '..', developer.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await developer.deleteOne();
    res.status(200).json({
      success:true,
      message:'Developer Deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}


exports.getAllDevelopers = async (req, res, next) => {
  try {
    const { role, techStack, search, sortBy, page=1,limit=10 } = req.query;
    let filter = {};

    if (role) {
      filter.role = role;
    }

    if (techStack) {
      filter.techStack = { $regex: techStack, $options: 'i' };
    }

  if(search){
    filter.$or=[
      {
        fullName:{$regex:search, $options: 'i'}
      },
      {
        techStack:{$regex:search,$options:'i'}
      }
    ]
  }


  let sort= {createdAt:-1};

  if(sortBy==='experience-asc'){
    sort={experience:1}
  }else if(sortBy==='experience-desc'){
    sort= {experience :-1}
  }

  const skip = (page-1) * limit;
    const developers = await Developer.find(filter)
                                      .sort(sort)
                                      .limit(parseInt(limit))
                                      .skip(skip)
                                      .populate('createdBy', 'name email')

    const total=await Developer.countDocuments(filter);
    res.status(200).json({ 
      success: true,
      data: developers ,
      pagination:{
        total,
        page:parseInt(page),
        pages:Math.ceil(total/limit),
        hasMore:skip + developers.length<total
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getDeveloperById= async(req,res,next)=>{
  try {
    const developer= await Developer.findById(req.params.id).populate('createdBy', 'name email')
    if(!developer){
      return res.status(404).json({
        success:false,
        message:'Developer not found'
      })
    }
   
    res.status(200).json({
      success:true,
      data:developer
    })

  } catch (error) {
    next(error)
  }
}