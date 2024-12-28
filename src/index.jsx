import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
// Import the MainView component
import "./index.scss"; // Import any styles (e.g., index.scss)

const MyFlixApplication = () => {
  return <MainView />; // Directly render the MainView component
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
