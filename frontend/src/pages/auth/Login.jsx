// src/pages/auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    isAdmin: false // Toggle between user and admin login
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const toggleLoginType = () => {
    setCredentials(prev => ({
      ...prev,
      isAdmin: !prev.isAdmin,
      username: '',
      password: ''
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (credentials.isAdmin) {
        // Hardcoded admin credentials
        if (credentials.username === 'Ritika' && credentials.password === 'Ritika@11') {
          localStorage.setItem('user', JSON.stringify({
            username: 'Ritika',
            role: 'admin',
            authenticated: true
          }));
          navigate('/dashboard'); // Admin goes to admin dashboard
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        // Regular user login logic
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => 
          (u.email === credentials.username || u.name === credentials.username) && 
          u.password === credentials.password
        );

        if (user) {
          localStorage.setItem('user', JSON.stringify({
            ...user,
            authenticated: true,
            role: 'user'
          }));
          navigate('/home'); // Regular users go to home page
        } else {
          setError('Invalid username or password');
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className={`py-6 px-8 text-center ${credentials.isAdmin ? 'bg-red-600' : 'bg-indigo-600'}`}>
          <h1 className="text-3xl font-bold text-white">
            {credentials.isAdmin ? 'Admin Login' : 'User Login'}
          </h1>
          <p className="text-indigo-100 mt-2">
            {credentials.isAdmin ? 'Restricted Access' : 'Welcome back to WardWatch'}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                {credentials.isAdmin ? 'Admin Username' : 'Username or Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-indigo-500"
                  placeholder={credentials.isAdmin ? 'Enter admin username' : 'Your username or email'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-indigo-500"
                  placeholder="Your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg transition duration-200 font-medium ${
                loading 
                  ? 'bg-gray-400' 
                  : credentials.isAdmin 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              {loading ? 'Authenticating...' : credentials.isAdmin ? 'Login as Admin' : 'Login as User'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button
              onClick={toggleLoginType}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {credentials.isAdmin ? '← Login as regular user' : 'Login as admin →'}
            </button>
            
            {!credentials.isAdmin && (
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;