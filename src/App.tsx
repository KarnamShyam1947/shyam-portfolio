import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Header from './components/Header';
import ThemeControl from './components/ThemeControl';
import { ThemeProvider } from './context/ThemeContext';
import AllCertificates from './pages/AllCertificates';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './sections/About';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Publications from './sections/Publications';
import Services from './sections/Services';
import Skills from './sections/Skills';
import Timeline from './sections/Timeline';
import { useAuthStore } from './store/authStore';
import { useDataStore } from './store/dataStore';
import ChangePassword from './components/dashboard/ChangePasswordManager';

function App() {
  const { user, checkAuth } = useAuthStore();
  const { fetchAllData } = useDataStore();

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, [checkAuth, fetchAllData]);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/certificates" element={<AllCertificates />} />
          <Route path="/" element={
            <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
              <Header />
              <main>
                <Hero />
                <About />
                <Skills />
                <Services />
                <Timeline />
                <Certificates />
                <Publications />
                <Projects />
                <Contact />
              </main>
              <Footer />
              <ThemeControl />
              <Chatbot />
            </div>
          } />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        closeButton={true}
      />
    </ThemeProvider>
  );
}

export default App;