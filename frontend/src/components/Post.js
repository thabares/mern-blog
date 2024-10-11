import styled from 'styled-components';
import {
  MdPublishedWithChanges,
  MdUnpublished,
  MdOutlineBookmark,
  MdOutlineBookmarkBorder,
  MdReportGmailerrorred,
  MdOutlineDelete,
} from 'react-icons/md';
import { bookmarkPost } from '../auth';
import { useContext } from 'react';
import { AuthContext } from '../App';

const PostWrapper = styled.div``;

// Post header containing author info and date
const PostHeader = styled.div`
  display: flex;
  align-items: center; // Align items to the center
  justify-content: space-between;
  margin-bottom: 10px; // Space between the header and content
  width: 100%;
`;

// Author avatar styling
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ddd; // Placeholder avatar color
  border-radius: 50%; // Make the avatar circular
  margin-right: 10px; // Space between avatar and author info
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bf4f74;
  color: papayawhip;
  font-weight: 900;
`;

// Author name and post date
const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: bold; // Bold author name
  }

  small {
    color: #555; // Muted color for post date
  }
`;

const AvatarAuthorWrapper = styled.div`
  display: flex;
`;

const BookMarkReportWrapper = styled.div`
  display: flex;
  svg {
    color: #bf4f74;
    /* cursor: pointer; */
  }
`;

const Post = ({
  content,
  author,
  createdAt,
  published,
  isBookmarked,
  handleBookmark,
  postId,
  deleteYourPost,
}) => {
  const { userInformation } = useContext(AuthContext);

  return (
    <PostWrapper>
      <PostHeader>
        <AvatarAuthorWrapper>
          <Avatar>
            {author?.username ? author?.username[0]?.toUpperCase() ?? '' : ''}
          </Avatar>
          <AuthorInfo>
            <span>{author?.username ?? ''}</span>
            <small>{new Date(createdAt).toLocaleString()}</small>
          </AuthorInfo>
        </AvatarAuthorWrapper>
        <BookMarkReportWrapper>
          {/* To let the user know if the post is published or not */}
          {published ? (
            <MdPublishedWithChanges title='Published' />
          ) : (
            author._id === userInformation.id && (
              <MdUnpublished title='Not published' />
            )
          )}

          {/* User can bookmark or remove bookmark */}
          {isBookmarked ? (
            <MdOutlineBookmark
              onClick={() => handleBookmark(postId)}
              style={{ cursor: 'pointer' }}
              title='Remove Bookmark'
            />
          ) : (
            <MdOutlineBookmarkBorder
              onClick={() => handleBookmark(postId)}
              style={{ cursor: 'pointer' }}
              title='Bookmark'
            />
          )}

          {/* Report */}
          {author._id !== userInformation.id && (
            <MdReportGmailerrorred
              style={{ cursor: 'pointer' }}
              title='Report'
            />
          )}

          {/* Delete your post */}
          {author._id === userInformation.id && (
            <MdOutlineDelete
              style={{ cursor: 'pointer' }}
              title='Delete'
              onClick={() => deleteYourPost(postId)}
            />
          )}
        </BookMarkReportWrapper>
      </PostHeader>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </PostWrapper>
  );
};
export default Post;
