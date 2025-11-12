const express = require('express');
const { Complaint } = require('../models');
const { verifyToken, isAdmin } = require('../middleware/auth');
const router = express.Router();

// ✅ Get all complaints (admins see all, students see theirs)
router.get('/', verifyToken, async (req, res) => {
  try {
    const where = req.user.role === 'admin' ? {} : { UserId: req.user.id };
    const complaints = await Complaint.findAll({ where });
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
});

// ✅ Submit a complaint
router.post('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'student')
      return res.status(403).json({ message: 'Students only' });

    const { name, roomNumber, block, type, description } = req.body;

    // Ensure required fields are provided
    if (!name || !roomNumber || !block || !type || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const complaint = await Complaint.create({
      name,
      roomNumber,
      block,
      type,
      description,
      UserId: req.user.id
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ message: 'Error creating complaint', error: error.message });
  }
});

// ✅ Update complaint (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const complaint = await Complaint.findByPk(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    await complaint.update(req.body);
    res.json(complaint);
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).json({ message: 'Error updating complaint', error: error.message });
  }
});

// ✅ Delete complaint (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const complaint = await Complaint.findByPk(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    await complaint.destroy();
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ message: 'Error deleting complaint', error: error.message });
  }
});

module.exports = router;
