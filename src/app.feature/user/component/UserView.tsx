import { User } from '../type';

type Props = {
  user: User;
};

const UserView = ({ user }: Props) => {
  return (
    <div>
      <h2>사용자 정보</h2>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
      <p>역할: {user.role}</p>
    </div>
  );
};

export default UserView;
