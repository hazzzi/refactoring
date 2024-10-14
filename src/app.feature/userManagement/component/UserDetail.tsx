import { User } from '../type';

type Props = {
  user: User;
  onEditClick: () => void;
};

const UserDetail = ({ user, onEditClick }: Props) => {
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
      <button onClick={onEditClick}>Edit</button>
    </div>
  );
};

export default UserDetail;
