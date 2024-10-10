import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

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
`;

const StyledReactQuill = styled(ReactQuill)`
  .ql-editor {
    min-height: 4rem; // Initial height
    max-height: 4rem; // Maximum height when focused
    overflow-y: auto; // Enable internal scrolling for the editor
  }
`;

const PostList = () => {
  const [posts, setPosts] = useState([
    {
      content: 'Test',
      author: 'thabares',
      createdAt: new Date(),
    },
    {
      content: 'Test1',
      author: 'thabares',
      createdAt: new Date(),
    },
    {
      content: 'Test2',
      author: 'thabares',
      createdAt: new Date(),
    },
    {
      content: 'Test3',
      author: 'thabares',
      createdAt: new Date(),
    },
    {
      content: 'Test4',
      author: 'thabares',
      createdAt: new Date(),
    },
    {
      content: 'Test5',
      author: 'thabares',
      createdAt: new Date(),
    },
    {
      content: 'Test6',
      author: 'thabares',
      createdAt: new Date(),
    },
    {
      content: 'Test7',
      author: 'thabares',
      createdAt: new Date(),
    },
  ]);
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const handlePost = () => {
    const newPost = {
      content,
      author: 'thabares',
      createdAt: new Date(),
    };
    setPosts([...posts, newPost]);
    setContent(''); // Clear content after posting
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
        <ButtonWrapper isFocused={isFocused}>
          <Button onClick={handlePost}>Add Post</Button>
        </ButtonWrapper>
      </CreatePostWrapper>
      <PostListWrapper>
        {posts.map((post, index) => (
          <PostListContainer key={index} value={index}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <div>Author: {post.author}</div>
            <div>Created At: {post.createdAt.toString()}</div>
          </PostListContainer>
        ))}
      </PostListWrapper>
    </PostWrapper>
  );
};

export default PostList;
