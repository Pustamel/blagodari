import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { GraphPage } from './pages/GraphPage/GraphPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MapPage } from './pages/MapPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import styles from './App.module.scss';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
