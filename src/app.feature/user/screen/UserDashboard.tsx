import { BASE_URL } from '@/app.module/api/environment';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostListView from '../component/PostListView';
import UserView from '../component/UserView';
import { User } from '../type';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get<User>(`${BASE_URL}/user`);
        setUser(userResponse.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
