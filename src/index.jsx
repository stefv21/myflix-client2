import { createRoot } from 'react-dom/client';
import { MainView } from './main-view/main-view'; // Correct path to MainView component
import './index.scss'; // Import your global styles

const MyFlixApplication = () => {
  return <MainView />;
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<MyFlixApplication />);
