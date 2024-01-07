// src/components/Dashboard.tsx
import { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from "react-redux";
import { fetchSmartphones, setSearchTerm } from "../store/smartphoneSlice";
import { useAppDispatch } from "../hooks/useDispatch";
import { RootState } from "../store/store";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import HeaderText from "./shared/headerText.component";
import CircleThumbNail from "./shared/CircleThumbnail.component";

const Header = styled.label`
  font-weight: bold;
  font-size: 18px;
`;

const SmartPhoneContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0;

  @media (max-width: 768px) {
    // Adjust breakpoint as needed
    grid-template-columns: repeat(
      1,
      1fr
    ); // One column layout for smaller screens
  }
`;

const GridItem = styled.div`
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SmartphoneDetailsRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 15px;
  text-align: left;
`;

const DescriptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SearchBarContainer = styled.div`
  display: flex;
  margin-bottom: 35px;
  flex-direction: row-reverse;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 350px;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  padding: 10px 40px 10px 10px;
  width: 100%;
  font-size: 16px; // Set font size or as needed
  border: 1px solid #ccc;

  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #aaa;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px; /
  pointer-events: none; // Make the icon non-interactive
  color: #333; 
`;

// Dashboard component
const Dashboard: React.FC = () => {

    const dispatch = useAppDispatch();
    
    //use shallowEqual since the state is returning a complex object for performance

    const { smartphones, searchTerm, status, error } = useSelector(
      (state: RootState) => state.smartphones, shallowEqual
    );
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchSmartphones());
      }
    }, [status, dispatch]);
  
    // Debouncing search term
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 500); // 500ms delay
  
      return () => {
        clearTimeout(handler);
      };
    }, [searchTerm]);
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchTerm(event.target.value));
    };
  
    const filteredSmartphones = smartphones.filter(
      (smartphone) =>
        smartphone.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        smartphone.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  
    // Handling loading and error states
    if (status === 'loading') {
      return <div>Loading smartphones...</div>;
    }
  
    if (error) {
      return <div>Error fetching smartphones: {error}</div>;
    }
  

    return (
        <div className="container">
          <HeaderText text={"Dashboard"} as={"h2"} />
          <SearchBarContainer>
            <SearchBar>
              <SearchInput
                aria-label="Search Smartphones"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search"
              />
              <SearchIcon size={20} aria-hidden="true" />
            </SearchBar>
          </SearchBarContainer>
    
          {filteredSmartphones.length > 0 ? (
            <SmartPhoneContainer>
              {filteredSmartphones.map((smartphone) => (
                <GridItem key={smartphone.id}>
                  <SmartphoneDetailsRow>
                    <CircleThumbNail
                      imageUrl={smartphone.image || "placeHolder.png"}
                      alt={`Image of ${smartphone.name}`} // Accessibility: alt text for images
                    />
                  </SmartphoneDetailsRow>
                  <DescriptionRow>
                    <DescriptionColumn><Header>{smartphone.name}</Header></DescriptionColumn>
                    <DescriptionColumn>{smartphone.brand}</DescriptionColumn>
                  </DescriptionRow>
                </GridItem>
              ))}
            </SmartPhoneContainer>
          ) : (
            <div>No matching smartphones found. Please try a different search term.</div>
          )}
        </div>
      );
    };

export default Dashboard;
