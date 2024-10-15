import { BASE_URL } from '@/app.module/api/environment';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserView from '../component/UserView';
import { Comment, Post, User } from '../type';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get<User>(`${BASE_URL}/user`);
        setUser(userResponse.data);

        const postsResponse = await axios.get<Post[]>(`${BASE_URL}/posts`);
        setPosts(postsResponse.data);

        const commentsResponse = await axios.get<Comment[]>(`${BASE_URL}/comments`);
        setComments(commentsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error(err)
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeletePost = async (postId: number) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error(err)
      setError('게시물을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  const handleAddComment = async (postId: number, content: string) => {
    try {
      const response = await axios.post<Comment>(`${BASE_URL}/comments`, {
        postId,
        content,
      });
      setComments([...comments, response.data]);
    } catch (err) {
      console.error(err)
      setError('댓글을 추가하는 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h1>사용자 대시보드</h1>
      <UserView user={user} />
      <div>
        <h2>게시물</h2>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {user.role === 'admin' && (
              <button onClick={() => handleDeletePost(post.id)}>삭제</button>
            )}
            <div>
              <h4>댓글</h4>
              {comments
                .filter((comment) => comment.postId === post.id)
                .map((comment) => (
                  <p key={comment.id}>{comment.content}</p>
                ))}
              <input
                type="text"
                placeholder="새 댓글"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(post.id, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
