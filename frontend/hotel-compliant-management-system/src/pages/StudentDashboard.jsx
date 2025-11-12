import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ComplaintForm from '../components/Student/ComplaintForm';
import ComplaintHistory from '../components/Student/ComplaintHistory';

const StudentDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [refresh, setRefresh] = React.useState(0);

  const handleSubmitSuccess = () => setRefresh(refresh + 1);

  return (
    <div>
      <h1>Student Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <ComplaintForm onSubmitSuccess={handleSubmitSuccess} />
      <ComplaintHistory key={refresh} />
    </div>
  );
};

export default StudentDashboard;