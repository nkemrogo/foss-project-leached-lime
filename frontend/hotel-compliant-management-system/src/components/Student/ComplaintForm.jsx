import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    block: '',
    type: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/complaints', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Complaint submitted successfully');
      setFormData({ name: '', roomNumber: '', block: '', type: '', description: '' });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch {
      alert('Error submitting complaint');
    }
  };

  return (
    <div>
      <h3>Submit Complaint</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
        <input name="roomNumber" value={formData.roomNumber} onChange={handleChange} placeholder="Room Number" required />
        <input name="block" value={formData.block} onChange={handleChange} placeholder="Block" required />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Complaint Type (e.g., Plumbing)" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ComplaintForm;