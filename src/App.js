import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApplicationForm from './components/ApplicationForm';
import Review from './components/Review';
import DownloadPage from './components/DownloadPage';
function App() {
  return (
    <Router>
      <div className="app-container">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet"/>
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route path="/review" element={<Review />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
