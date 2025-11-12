import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintTable = ({ onEdit }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('/api/complaints', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setComplaints(res.data);
      } catch {
        alert('Error fetching complaints');
      }
    };
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setComplaints(complaints.filter((c) => c.id !== id));
    } catch {
      alert('Error deleting complaint');
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Room</th>
          <th>Block</th>
          <th>Type</th>
          <th>Description</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.roomNumber}</td>
            <td>{c.block}</td>
            <td>{c.type}</td>
            <td>{c.description}</td>
            <td>{c.status}</td>
            <td>{new Date(c.createdAt).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onEdit(c)}>Edit</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ComplaintTable;