type Props = {
  name: string;
  email: string;
  role: string;
};

const UserView = ({ email, name, role }: Props) => {
  return (
    <div>
      <h2>사용자 정보</h2>
      <p>이름: {name}</p>
      <p>이메일: {email}</p>
      <p>역할: {role}</p>
    </div>
  );
};

export default UserView;
