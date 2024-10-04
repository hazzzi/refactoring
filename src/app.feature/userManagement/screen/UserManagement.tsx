import { BASE_URL } from '@/app.module/api/environment';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  lastLogin: string;
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  // 1. 유저 목록을 불러오는 일
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get<User[]>(`${BASE_URL}/users`);
      setUsers(response.data);
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  // 2. 유저를 선택하는 일
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setEditMode(false);
  };

  // 3. 유저 정보를 수정모드로 전환
  const handleEditClick = () => {
    setEditMode(true);
  };

  // 4. 유저 정보를 저장하는 일
  const handleSaveClick = async () => {
    if (!selectedUser) return;

    try {
      await axios.put(`${BASE_URL}/users/${selectedUser.id}`, selectedUser);
      setEditMode(false);
      fetchUsers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to update user');
    }
  };

  // 5. 수정 모드에서 유저 정보를 전환하는 일
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser) return;

    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Management</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user)}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
        <div style={{ width: '50%' }}>
          <h2>User Details</h2>
          {selectedUser ? (
            <div>
              {editMode ? (
                <div>
                  <input
                    name="name"
                    value={selectedUser.name}
                    onChange={handleInputChange}
                  />
                  <input
                    name="email"
                    value={selectedUser.email}
                    onChange={handleInputChange}
                  />
                  <select
                    name="role"
                    value={selectedUser.role}
                    onChange={handleInputChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <div>
                  <p>Name: {selectedUser.name}</p>
                  <p>Email: {selectedUser.email}</p>
                  <p>Role: {selectedUser.role}</p>
                  <p>Last Login: {new Date(selectedUser.lastLogin).toLocaleString()}</p>
                  <button onClick={handleEditClick}>Edit</button>
                </div>
              )}
            </div>
          ) : (
            <p>Select a user to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;