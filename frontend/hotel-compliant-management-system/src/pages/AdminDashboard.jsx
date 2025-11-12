import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ComplaintTable from '../components/Admin/ComplaintTable';
import EditComplaintModal from '../components/Admin/EditComplaintModal';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleEdit = (complaint) => setEditingComplaint(complaint);
  const handleClose = () => setEditingComplaint(null);
  const handleUpdate = () => {
    setRefresh(refresh + 1);
    handleClose();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <ComplaintTable onEdit={handleEdit} key={refresh} />
      {editingComplaint && (
        <EditComplaintModal complaint={editingComplaint} onClose={handleClose} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default AdminDashboard;