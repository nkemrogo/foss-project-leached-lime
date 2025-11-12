import React, { useState } from 'react';
import axios from 'axios';

const EditComplaintModal = ({ complaint, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(complaint);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/complaints/${formData.id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Complaint updated');
      onUpdate();
      onClose();
    } catch {
      alert('Error updating complaint');
    }
  };

  return (
    <div style={{ position: 'fixed', top: '20%', left: '30%', background: 'white', padding: '20px', border: '1px solid black' }}>
      <h3>Edit Complaint</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="roomNumber" value={formData.roomNumber} onChange={handleChange} placeholder="Room Number" required />
        <input name="block" value={formData.block} onChange={handleChange} placeholder="Block" required />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditComplaintModal;