import { User } from '../type';

type Props = {
  users: User[];
  onUserClick: (user: User) => void;
};

const UserList = ({ users, onUserClick }: Props) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onUserClick(user)}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
};

export default UserList;
