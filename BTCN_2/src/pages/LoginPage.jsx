import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const res = await login(username, password);
    if (res.success) {
        navigate('/'); // Login xong về Home
    } else {
        setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required 
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required 
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <button disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            No account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;