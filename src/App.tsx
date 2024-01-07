// src/App.tsx

import React, { Suspense, lazy, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes/theme";
import { GlobalStyles } from "./themes/GlobalStyles";
import Layout from "./components/Layout";
import { RootState } from "./store/store";
import { setTheme } from "./store/themeSlice";

// Lazy loading of components for better performance
const Dashboard = lazy(() => import("./components/Dashboard"));
const Smartphones = lazy(() => import("./components/Smartphones"));
const CreateSmartphoneForm = lazy(() => import("./components/CreateSmartphoneForm"));

/**
 * App Component
 * 
 * The App component is the root of the application. It integrates various functionalities
 * including routing, theme switching, and layout management.
 * 
 * It uses React Router for navigation between different pages of the app. The routes are
 * defined using the <Route> component from react-router-dom.
 * 
 * For theme management, it utilizes Redux to store the current theme state ('light' or 'dark') 
 * and styled-components for theming support.
 * 
 * The components Dashboard, Smartphones, and CreateSmartphoneForm are loaded lazily 
 * using React's Suspense and lazy for performance optimization.
 * 
 * The ThemeProvider from styled-components is used to apply global theme styles across
 * the application. The theme is toggled using a function that dispatches the setTheme action.
 * 
 * The GlobalStyles component applies global styles to the application.
 * 
 */
const App: React.FC = () => {
  
  const themeName = useSelector((state: RootState) => state.theme.themeName, shallowEqual);

  const dispatch = useDispatch();

  // Function to toggle the theme
  const toggleTheme = (selectedTheme: "light" | "dark") => {
    dispatch(setTheme(selectedTheme));
  };

  // Determine the theme based on the Redux state, to prevent of theme object on render memoized it

  const theme = useMemo(() => themeName === "light" ? lightTheme : darkTheme, [themeName]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Layout toggleTheme={toggleTheme}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/smartphones" element={<Smartphones />} />
              <Route path="/create-smartphone" element={<CreateSmartphoneForm />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
