import { BASE_URL } from '@/app.module/api/environment';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Comment, Post } from '../type';

type Props = {
  post: Post;
};

const CommentListView = ({ post }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsResponse = await axios.get<Comment[]>(`${BASE_URL}/comments`);
        setComments(commentsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleAddComment = async (postId: number, content: string) => {
    try {
      const response = await axios.post<Comment>(`${BASE_URL}/comments`, {
        postId,
        content,
      });
      setComments([...comments, response.data]);
    } catch (err) {
      console.error(err);
      setError('댓글을 추가하는 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddComment(post.id, e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
};

export default CommentListView;
