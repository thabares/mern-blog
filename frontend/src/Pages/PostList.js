import { useState } from 'react';
import styled from 'styled-components';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column; // Align children vertically
  flex-grow: 1; // Allow PostWrapper to grow
`;

const CreatePostWrapper = styled.div`
  background-color: #f3dab1;
  height: auto; // Let it adapt to the content height
  width: 100%; // Ensure it takes the full width of the parent
  padding: 5%; // Padding may push content, adjust if needed
  box-sizing: border-box; // Include padding and border in element's total width
  display: flex;
  flex-direction: column;
  border-radius: 2rem; // Keep border radius for aesthetics
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Optional: Add shadow for better visibility
`;

const TextareaElement = styled.textarea`
  height: 3rem; // Initial height
  transition: height 0.3s ease; // Animation for height
  border: 1px solid #ccc;
  padding: 0.5rem; // Inner padding
  border-radius: 5px; // Rounded corners
  width: 100%; // Ensure input takes full width
  resize: none; // Disable manual resizing

  &:focus {
    height: 6rem; // Height when focused (increase as needed)
    border: 1px solid #bf4f74; // Change border color on focus
    outline: none; // Remove default outline
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; // Align the button to the end
  opacity: 0;
  visibility: hidden;

  ${TextareaElement}:focus + & {
    opacity: 1; // Show the button when the input is focused
    visibility: visible; // Make it visible
  }
`;

const Button = styled.button`
  margin-top: 10px;
  width: 15vh;
  padding: 0.5rem 1rem;
  background-color: #bf4f74;
  color: white;
  border: none;
  border-radius: 5px;
  transition: opacity 0.3s ease; // Animation for opacity
`;

const PostListWrapper = styled.div`
  margin-top: 10px; // Add some spacing between the input and the posts
`;

const PostListContainer = styled.div`
  margin-bottom: 10px; // Add space between individual posts
  padding: 1rem;
  border: 1px solid #ccc; // Optional: Add border for visibility
  border-radius: 5px; // Rounded corners for posts
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
  ]);

  return (
    <PostWrapper>
      <CreatePostWrapper>
        <TextareaElement placeholder="What's on your mind?" />
        <ButtonWrapper>
          <Button>Add Post</Button>
        </ButtonWrapper>
      </CreatePostWrapper>
      <PostListWrapper>
        {posts.map((post, index) => (
          <PostListContainer key={index}>
            <div>{post.content}</div>
            <div>Author: {post.author}</div>
            <div>Created At: {post.createdAt.toString()}</div>
          </PostListContainer>
        ))}
      </PostListWrapper>
    </PostWrapper>
  );
};

export default PostList;
