const express = require('express');
const router = express.Router();
const User = require('../Model/users.js');
const upload = require('../Middleware/upload');


const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { username } = req.body;
    const img = req.file ? req.file.filename : null; 
  
    try {
      const user = await User.findById(userId);
   
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
   
      user.username = username || user.username;
   
      if (img) {
        user.img = img; 
      }
   
      await user.save();
   
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
  };
  


router.put('/users/:userId', upload.single('file'), updateProfile);

module.exports = router;
