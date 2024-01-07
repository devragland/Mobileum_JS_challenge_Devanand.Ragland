
# Smart Phone Management React Challenge

Smart phone Managment Demo application

## Project Summary

This React application uses React and TypeScript. It includes a webpack setup for both development and production environments, The application supports theming and built with a mobile first approach (responsive design).

## Peformance Optimizations

1. Memoized Components that dont require rerenders 
2. Usage of shallowEqual - Redux selector 
3. Lazy loading modules 
4. Thumbnail images have been lazy loaded
5. By moving data to redux, avoided uncessary API calls

## Justification for a central state management

Since different pages in the application have the same datafetching requirements and CRUD operations or performed on some of the components it is necessary to have central state management, also all API requests are handled in async thunks and the business logic is moved out of the components itself.

## Features

- React 17+ and TypeScript setup.
- Webpack for bundling, including separate configurations for development and production.
- Development server with Hot Module Replacement (HMR) for real-time reloading.
- Production build optimizations including minification, tree shaking, and chunk splitting.
- Styled-components for component-level styling.
- Formik and Yup for form management and validation.
- Integration of `react-icons` for easy icon usage.
- Redux and Redux Toolkit for state Management

## Prerequisites

- Node.js
- npm (usually comes with Node.js)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

1.  Clone the repository.
2.  Install dependencies: `npm install`.
3.  To start the development server: `npm start`.
4.  To build the application for production: `npm run build`.


##  Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-project-name.git



  