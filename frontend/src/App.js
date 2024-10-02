import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Protected from './Pages/Protected';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<PageNotFound />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Protected />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
