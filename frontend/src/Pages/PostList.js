import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import Toaster from '../components/Toaster';
import axiosInstance from '../axiosInterceptor';
import { bookmarkPost, createPosts, deletePost, getPosts } from '../auth';
import Post from '../components/Post';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%; // Ensure it takes full width
`;

const CreatePostWrapper = styled.div`
  background-color: #f3dab1;
  width: 100%;
  max-width: 800px; // Limit the maximum width
  padding: 4% 5% 5% 5%;
  border-radius: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto; // Center the wrapper
  box-sizing: border-box; // Include padding and border in the width
  margin-bottom: 5%;
  height: 250px; // Set a fixed height for the wrapper
  overflow: hidden; // Prevent overflow from the editor
`;

const CreatePostTitleWrapper = styled.div`
  margin-bottom: 20px; // Add space below the title
`;

const CreatePostTitle = styled.h2`
  margin: 0; // Remove default margin
  font-size: 1.2rem; // Adjust the font size
  color: #bf4f74;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  opacity: ${(props) => (props.isFocused ? 1 : 0)};
  visibility: ${(props) => (props.isFocused ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 15vh;
  padding: 0.5rem 1rem;
  background-color: #bf4f74;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PostListWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 50vh; /* Set a fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  padding-right: 20px; /* Add space for the scrollbar */
  box-sizing: border-box; /* Include padding in the width */
  position: relative; /* Ensure positioning for scrollbar */
`;

const PostListContainer = styled.div`
  padding: 1rem;
  margin-top: ${(props) => (props.value === 0 ? '2%' : '3%')};
  border: 1px solid #ccc;
  border-radius: 1rem;

  div {
    text-transform: capitalize;
  }
`;

const StyledReactQuill = styled(ReactQuill)`
  .ql-editor {
    min-height: 4rem; // Initial height
    max-height: 4rem; // Maximum height when focused
    overflow-y: auto; // Enable internal scrolling for the editor
  }
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [commentInputs, setCommentInputs] = useState(
    Array(posts.length).fill('')
  ); // Track comments for each post
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  useEffect(() => {
    const fetchPosts = async () => {
      let response = await getPosts();
      setPosts(response.posts);
    };

    fetchPosts();
  }, []);

  const handlePost = async () => {
    try {
      const response = await createPosts(content);
      const newPost = {
        content: response.post.content,
        author: response.post.author,
        createdAt: response.post.createdAt,
        likes: 0,
        comments: [],
      };
      setPosts([...posts, newPost]);
      setIsFocused(false);
      setContent(''); // Clear content after posting
      Toaster.sucess('Successfully created your post');
    } catch (err) {
      Toaster.error('Error creating post');
      console.log(err);
    }
  };

  const handleBookmark = async (postId) => {
    try {
      const bookmarkResponse = await bookmarkPost(postId);
      const updatedPosts = posts.map((post) =>
        post._id === postId
          ? { ...post, isBookmarked: bookmarkResponse.isBookmarked } // Update the bookmarked status
          : post
      );

      setPosts(updatedPosts); // Set the updated posts in state
      Toaster.sucess(
        bookmarkResponse.isBookmarked
          ? 'Bookmarked successfully'
          : 'Removed bookmark'
      );
    } catch (err) {
      Toaster.error('Error bookmarking your post.');
      console.log(err);
    }
  };

  const deleteYourPost = async (postId) => {
    try {
      await deletePost(postId);
    } catch (err) {
      Toaster.error('Failed to delete your post');
      console.log(err);
    }
  };

  return (
    <PostWrapper>
      <CreatePostWrapper>
        <CreatePostTitleWrapper>
          <CreatePostTitle>Create your post</CreatePostTitle>
        </CreatePostTitleWrapper>
        <StyledReactQuill
          value={content}
          onChange={setContent}
          placeholder="What's on your mind?"
          onFocus={() => setIsFocused(true)} // Set focus state to true
          onBlur={() => setIsFocused(false)} // Set focus state to false
        />
        <ButtonWrapper isFocused={isFocused || content !== ''}>
          <Button onClick={handlePost}>Add Post</Button>
        </ButtonWrapper>
      </CreatePostWrapper>
      <PostListWrapper>
        {posts.map((post, index) => (
          <PostListContainer key={index} value={index}>
            <Post
              content={post.content}
              createdAt={post.createdAt}
              author={post.author}
              published={post.published}
              isBookmarked={post.isBookmarked}
              postId={post._id}
              handleBookmark={handleBookmark}
              deleteYourPost={deleteYourPost}
            />
          </PostListContainer>
        ))}
      </PostListWrapper>
    </PostWrapper>
  );
};

export default PostList;
