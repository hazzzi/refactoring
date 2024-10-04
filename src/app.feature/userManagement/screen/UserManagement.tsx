import { BASE_URL } from '@/app.module/api/environment';
import axios from 'axios';
import React, { useState } from 'react';
import useFetchUser from '../module/useFetchUser';
import useSelectUser from '../module/useSelectUser';

const UserManagement: React.FC = () => {
  const { loading, error, refetch, users } = useFetchUser();
  const [mutateError, setMutateError] = useState<string | null>(null);
  const { selectedUser, onSelectUser } = useSelectUser();

  // update
  const [editMode, setEditMode] = useState<boolean>(false);

  if (loading) return <div>Loading...</div>;
  if (error || mutateError) return <div>{error ?? mutateError}</div>;

  return (
    <div>
      <h1>User Management</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => {
                  onSelectUser(user);
                  setEditMode(false);
                }}
              >
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
                    onChange={(e) => {
                      if (!selectedUser) return;

                      onSelectUser({
                        ...selectedUser,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <input
                    name="email"
                    value={selectedUser.email}
                    onChange={(e) => {
                      if (!selectedUser) return;

                      onSelectUser({
                        ...selectedUser,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <select
                    name="role"
                    value={selectedUser.role}
                    onChange={(e) => {
                      if (!selectedUser) return;

                      onSelectUser({
                        ...selectedUser,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={async () => {
                      if (!selectedUser) return;

                      try {
                        await axios.put(`${BASE_URL}/users/${selectedUser.id}`, selectedUser);
                        setEditMode(false);
                        refetch();
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      } catch (err) {
                        setMutateError('Failed to update user');
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <p>Name: {selectedUser.name}</p>
                  <p>Email: {selectedUser.email}</p>
                  <p>Role: {selectedUser.role}</p>
                  <p>Last Login: {new Date(selectedUser.lastLogin).toLocaleString()}</p>
                  <button
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </button>
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
