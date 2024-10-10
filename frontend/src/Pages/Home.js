import styled from 'styled-components';
import PostList from './PostList';
import Favourites from './Favourites';

const HomeWrapper = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  height: 100%; /* Maintain full height */
  width: 90%;
  margin: auto;
`;

const PostWrapper = styled.div`
  flex: 0 0 70%; /* Takes up 70% of the available width */
  padding-right: 10px; /* Add some space between post and favourites */
  height: 100%; /* Set to 100% of parent height */
  overflow: auto; /* Allow overflow */
`;

const FavouritesWrapper = styled.div`
  flex: 0 0 30%; /* Takes up the remaining 30% of the available width */
  height: 100%; /* Set to 100% of parent height */
`;

const Home = () => {
  return (
    <HomeWrapper>
      <PostWrapper>
        <PostList />
      </PostWrapper>
      <FavouritesWrapper>
        <Favourites />
      </FavouritesWrapper>
    </HomeWrapper>
  );
};

export default Home;
