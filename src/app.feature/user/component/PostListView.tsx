import { BASE_URL } from '@/app.module/api/environment';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post, User } from '../type';
import CommentListView from './CommentListView';

type Props = {
  user: User;
};

const PostListView = ({ user }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get<Post[]>(`${BASE_URL}/posts`);
        setPosts(postsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
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
      console.error(err);
      setError('게시물을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {user.role === 'admin' && <button onClick={() => handleDeletePost(post.id)}>삭제</button>}
      <CommentListView post={post} />
    </div>
  ));
};

export default PostListView;
