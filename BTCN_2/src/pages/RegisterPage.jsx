import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Phone, Calendar } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', phone: '', dob: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const res = await register(formData);
    if (res.success) {
        alert("Registration successful! Please login.");
        navigate('/login');
    } else {
        setError(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Register</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="username" placeholder="Username" onChange={handleChange} required 
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required 
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required 
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="phone" placeholder="Phone" onChange={handleChange} 
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="dob" type="date" onChange={handleChange} 
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-500" />
          </div>

          <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">Register</button>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;