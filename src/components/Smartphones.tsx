// src/components/Smartphones.tsx

// SmartphonesPage.tsx
import React, { useEffect } from "react";
import SmartphoneTable from "./smartPhoneTable";

// Styled components for the layout
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../store/store";
import HeaderText from "./shared/headerText.component";
import { fetchSmartphones } from "../store/smartphoneSlice";
import { useAppDispatch } from "../hooks/useDispatch";

const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #1b2a39;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #1b2a39;
    opacity: 0.8;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const GridContainer = styled.div`
   margin-top: 25px;
`;

/**
 * SmartphonesPage Component
 * 
 * This component renders the page for displaying smartphones. It includes a header,
 * a button to create new smartphones, and a grid layout for the smartphone table.
 * It uses Redux for state management and React Router for navigation.
 */

const SmartphonesPage: React.FC = () => {
  const { smartphones, status } = useSelector(
    (state: RootState) => state.smartphones, shallowEqual
  );

  const headers = ["Name", "Brand", "Description"];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToCreateForm = () => {
    navigate("/create-smartphone"); // Route to navigate to the create form
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSmartphones());
    }
  }, [status, dispatch]);

  return (
    <div className="container">
      <HeaderText text={"Smartphone"} as={"h2"} />
      <ActionContainer>
        <CreateButton onClick={navigateToCreateForm}>Create new</CreateButton>
      </ActionContainer>

      <GridContainer>
        <SmartphoneTable smartphones={smartphones} headers={headers} />
      </GridContainer>
    </div>
  );
};

export default SmartphonesPage;
