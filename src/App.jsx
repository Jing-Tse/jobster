import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Landing,
  Register,
  Error,
  ShareLayout,
  Stats,
  AllJobs,
  AddJob,
  Profile,
  ProtectedRoute,
} from './pages';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <ShareLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={3000} />
    </BrowserRouter>
  );
};
export default App;
