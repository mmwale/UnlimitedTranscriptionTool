// Importing necessary modules from React and local components
import React from 'react'; // React library for building user interfaces
import Header from './components/Header'; // Importing the Header component
import TranscriptionInterface from './components/TranscriptionInterface'; // Importing the TranscriptionInterface component
import './index.css'; // Importing the CSS styles for the application

// Defining the main functional component for the application
const App = () => (
  <div>
    <Header /> 
    <TranscriptionInterface />
  </div>
);
// Exporting the App component as the default export of this module
export default App;

