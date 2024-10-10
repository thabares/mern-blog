import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Protected from './Pages/Protected';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './Pages/PageNotFound';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  userInformation: null,
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true' || false
  );
  const [userInformation, setUserInformation] = useState(
    JSON.parse(localStorage.getItem('userInformation')) || null
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('userInformation', JSON.stringify(userInformation));
  }, [isAuthenticated, userInformation]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInformation,
        setUserInformation,
      }}
    >
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
    </AuthContext.Provider>
  );
}

export default App;
