const Developer = require('../models/Developer');

exports.createDeveloper = async (req, res, next) => {
  try {
    const { fullName, role, techStack, experience } = req.body;

    const developer = await Developer.create({
      fullName,
      role,
      techStack,
      experience
    });

    res.status(201).json({ success: true, data: developer });
  } catch (error) {
    next(error);
  }
};

exports.getAllDevelopers = async (req, res, next) => {
  try {
    const { role, techStack } = req.query;
    let filter = {};

    if (role) {
      filter.role = role;
    }

    if (techStack) {
      filter.techStack = { $regex: techStack, $options: 'i' };
    }

    const developers = await Developer.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: developers });
  } catch (error) {
    next(error);
  }
};
