import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { GraphPage } from './pages/GraphPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { MapPage } from './pages/MapPage';
import { ProfilePage } from './pages/profilePage/ProfilePage';
import styles from './App.module.scss';
import { EditProfile } from "./pages/editProfile/EditPofile"

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
