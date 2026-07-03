import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import { db } from './utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

/* ─── Pages ───────────────────────────────────────────── */

import Home from './pages/Home/Home';
import Resources from './pages/Resources/Resources';
import Pyqs from './pages/Pyqs/Pyqs';
import GpaTools from './pages/GpaTools/GpaTools';
import Campus from './pages/Campus/Campus';
import Societies from './pages/Societies/Societies';
import Contribute from './pages/Contribute/Contribute';
import Admin from './pages/Admin/Admin';
import Announcements from './pages/Announcements/Announcements';
import Syllabus from './pages/Syllabus/Syllabus';
import Wifi from './pages/Wifi/Wifi';
import Classrooms from './pages/Classrooms/Classrooms';
import Feedback from './pages/Feedback/Feedback';
import NotFound from './pages/NotFound/NotFound';

/* ─── App ─────────────────────────────────────────────── */

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function updateHeartbeat() {
      try {
        const userDoc = doc(db, 'students', user.uid);
        await setDoc(userDoc, {
          lastActive: Date.now(),
          displayName: user.displayName || 'Anonymous',
          email: user.email
        }, { merge: true });
      } catch (err) {
        console.error('Failed to update user activity heartbeat:', err);
      }
    }

    updateHeartbeat();
    const interval = setInterval(updateHeartbeat, 90000); // 1.5 mins
    return () => clearInterval(interval);
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
          <Route index element={<Home />} />
          <Route path="resources" element={<Resources />} />
          <Route path="pyqs" element={<Pyqs />} />
          <Route path="gpa" element={<GpaTools />} />
          <Route path="campus" element={<Campus />} />
          <Route path="societies" element={<Societies />} />
          <Route path="contribute" element={<Contribute />} />
          <Route path="admin" element={<Admin />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="wifi" element={<Wifi />} />
          <Route path="classrooms" element={<Classrooms />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
