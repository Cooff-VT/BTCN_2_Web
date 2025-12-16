import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
      let newErrors = {};
      if (!username.trim()) newErrors.username = "Please enter your username";
      if (!password) newErrors.password = "Please enter your password";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) return;

    setLoading(true);
    const res = await login(username, password);
    if (res.success) {
        navigate('/'); 
    } else {
        setApiError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>
        
        {apiError && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm border border-red-200 text-center">{apiError}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-1">
            <div className="relative">
                <User className={`absolute left-3 top-3 ${errors.username ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={e => {
                        setUsername(e.target.value);
                        if(errors.username) setErrors({...errors, username: ''});
                    }} 
                    className={`w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:text-white transition-colors
                        ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'}
                    `} 
                />
            </div>
            {errors.username && <p className="text-red-500 text-xs flex items-center gap-1 pl-1"><AlertCircle size={12} /> {errors.username}</p>}
          </div>

          <div className="space-y-1">
            <div className="relative">
                <Lock className={`absolute left-3 top-3 ${errors.password ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => {
                        setPassword(e.target.value);
                        if(errors.password) setErrors({...errors, password: ''});
                    }} 
                    className={`w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:text-white transition-colors
                        ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'}
                    `} 
                />
            </div>
            {errors.password && <p className="text-red-500 text-xs flex items-center gap-1 pl-1"><AlertCircle size={12} /> {errors.password}</p>}
          </div>

          <button disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-md">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            No account? <Link to="/register" className="text-blue-500 hover:underline font-medium">Register now</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;