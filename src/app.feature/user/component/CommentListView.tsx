import { useData } from '../hook/useData';
import useMutate from '../hook/useMutate';
import { Comment, Post } from '../type';

type Props = {
  post: Post;
};

const CommentListView = ({ post }: Props) => {
  const { data: comments, error, loading } = useData<Comment[]>('/comments', []);
  const { mutate } = useMutate('/comments', 'post');

  const handleAddComment = async (postId: number, content: string) => {
    mutate({ postId, content });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!comments) return null;

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
