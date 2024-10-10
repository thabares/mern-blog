import styled from 'styled-components';

const FavouritesWrapper = styled.div`
  flex: 0 0 30%; // Ensure it takes up the correct width
  padding: 10px; // Optional: Add some padding for aesthetics
  overflow-y: auto; // Add scroll if content overflows
  border-left: 1px solid #ccc; // Optional: Add border for visibility
`;

const Favourites = () => {
  return (
    <FavouritesWrapper>
      <h2>Favourites</h2>
      {/* Add your favourite items here */}
    </FavouritesWrapper>
  );
};

export default Favourites;
