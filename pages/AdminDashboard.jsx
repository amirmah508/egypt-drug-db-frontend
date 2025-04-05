import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios.get("http://localhost:5000/api/admin/users", { headers }).then(res => setUsers(res.data)).catch(console.error);
    axios.get("http://localhost:5000/api/drugs", { headers }).then(res => setDrugs(res.data)).catch(console.error);
  }, []);

  const deleteUser = (id) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers })
      .then(() => setUsers(prev => prev.filter(u => u.id !== id)))
      .catch(console.error);
  };

  return (
    <motion.div className="admin-dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1>Admin Dashboard</h1>
      <div className="admin-section">
        <h2>Registered Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} — {user.email} ({user.role})
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h2>Drugs</h2>
        <ul>
          {drugs.map(drug => (
            <li key={drug.id}>{drug.name}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
