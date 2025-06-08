import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    isAdmin: false
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
        if (credentials.username === 'Ritika' && credentials.password === 'Ritika@11') {
          localStorage.setItem('user', JSON.stringify({
            username: 'Ritika',
            role: 'admin',
            authenticated: true
          }));
          navigate('/dashboard');
        } else {
          setError('Invalid admin credentials');
        }
      } else {
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
          navigate('/home');
        } else {
          setError('Invalid username or password');
        }
      }
      setLoading(false);
    }, 1000);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    setLoading(true);
    try {
      // Decode the JWT token to get user info
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const googleUser = JSON.parse(jsonPayload);
      
      // Check if user exists in local storage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      let user = existingUsers.find(u => u.email === googleUser.email);

      if (!user) {
        // Create new user from Google data
        user = {
          id: googleUser.sub,
          name: googleUser.name,
          email: googleUser.email,
          password: '', // No password for Google users
          role: 'user',
          authenticated: true,
          createdAt: new Date().toISOString(),
          ward: '', // User can update this later
          phone: '' // User can update this later
        };
        
        // Save the new user
        localStorage.setItem('users', JSON.stringify([...existingUsers, user]));
      }

      // Log the user in
      localStorage.setItem('user', JSON.stringify({
        ...user,
        authenticated: true
      }));
      
      navigate('/home');
    } catch (error) {
      setError('Google authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google authentication failed. Please try again.');
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

          {!credentials.isAdmin && (
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                 <GoogleOAuthProvider clientId="975353904586-j0e5mnsvg4lcivnptse9cupaaock8p40.apps.googleusercontent.com">
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        shape="pill"
        width="100%"  // This will make it take full width
        text="continue_with"
        size="large"  // Optional: makes the button taller
      />
    </div>
  </GoogleOAuthProvider>
              </div>
            </div>
          )}

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