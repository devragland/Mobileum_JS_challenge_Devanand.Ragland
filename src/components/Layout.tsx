// src/Layout.tsx

import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useLocation } from "react-router-dom";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #dbe0e4;
  border-bottom: 1px solid #c8ced2;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
  font-size: 16px;
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: #000;
  text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ThemeSwitcher = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ isActive: boolean }>`
  padding: 5px 20px;
  background-color: ${({ isActive }) => (isActive ? "#1b2a39" : "#ffff")};
  color: ${({ isActive }) => (isActive ? "#ffff" : "#1b2a39")};
  border: 1px solid ${({ isActive }) => (isActive ? "#ffff" : "#1b2a39")};
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d0d0d0;
  }
`;

interface LayoutProps {
  toggleTheme: (themeName: "light" | "dark") => void;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ toggleTheme, children }) => {
  // Use the useSelector hook to get the current theme name from the Redux store
  const currentTheme = useSelector((state: RootState) => state.theme.themeName);
  const location = useLocation();

  // Function to check if the link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <LayoutContainer>
      <HeaderContainer>
        <Navigation>
          <NavLink to="/dashboard" isActive={isActive("/dashboard")}>
            Dashboard
          </NavLink>
          <NavLink to="/smartphones" isActive={isActive("/smartphones")}>
            Smartphones
          </NavLink>
        </Navigation>
        <ThemeSwitcher>
          {/* Set isActive based on the currentTheme from the Redux store */}
          <Button
            onClick={() => toggleTheme("light")}
            isActive={currentTheme === "light"}
          >
            Light
          </Button>
          <Button
            onClick={() => toggleTheme("dark")}
            isActive={currentTheme === "dark"}
          >
            Dark
          </Button>
        </ThemeSwitcher>
      </HeaderContainer>
      {/* Render children passed to the Layout */}
      {children}
    </LayoutContainer>
  );
};

export default Layout;
