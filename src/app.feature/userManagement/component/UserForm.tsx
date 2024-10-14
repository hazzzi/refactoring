import { useState } from 'react';
import { User } from '../type';

type Props = {
  user: User;
  onSaveClick: (user: User) => void;
};

const UserForm = ({ user, onSaveClick }: Props) => {
  const [formData, setFormData] = useState<User>(user);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = () => {
    onSaveClick(formData);
  };

  return (
    <div>
      <input name="name" value={formData.name} onChange={handleChangeInput} />
      <input name="email" value={formData.email} onChange={handleChangeInput} />
      <select
        name="role"
        value={formData.role}
        onChange={handleChangeInput as unknown as React.ChangeEventHandler<HTMLSelectElement>}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default UserForm;
