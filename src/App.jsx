import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Layout from './components/layout/Layout';

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
import NotFound from './pages/NotFound/NotFound';

/* ─── App ─────────────────────────────────────────────── */

export default function App() {
  const { theme, toggleTheme } = useTheme();

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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
