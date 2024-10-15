import React from 'react';
import PostListView from '../component/PostListView';
import UserView from '../component/UserView';
import { useData } from '../hook/useData';
import { User } from '../type';

const UserDashboard: React.FC = () => {
  const { data: user, error, loading } = useData<User>('/user');

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h1>사용자 대시보드</h1>
      <UserView user={user} />
      <div>
        <h2>게시물</h2>
        <PostListView user={user} />
      </div>
    </div>
  );
};

export default UserDashboard;
