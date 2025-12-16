import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Phone, Calendar, AlertCircle } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', phone: '', dob: ''
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must be 10-11 digits";
    }

    if (formData.dob) {
      const selectedDate = new Date(formData.dob);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.dob = "Date of birth cannot be in the future";
      }
    } else {
        newErrors.dob = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) return;

    const res = await register(formData);
    if (res.success) {
        alert("Registration successful! Please login.");
        navigate('/login');
    } else {
        setApiError(res.message);
    }
  };

  const renderInput = (name, type, placeholder, Icon, errorKey) => (
    <div className="space-y-1">
      <div className="relative">
        <Icon className={`absolute left-3 top-3 ${errors[errorKey] ? 'text-red-500' : 'text-gray-400'}`} size={20} />
        <input 
            name={name} 
            type={type} 
            placeholder={placeholder} 
            value={formData[name]}
            onChange={handleChange} 
            className={`w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:text-white transition-colors
                ${errors[errorKey] 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                }
            `}
        />
      </div>
      {errors[errorKey] && (
        <p className="text-red-500 text-xs flex items-center gap-1 pl-1">
            <AlertCircle size={12} /> {errors[errorKey]}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Register</h2>
        
        {apiError && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm border border-red-200">{apiError}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInput("username", "text", "Username", User, "username")}
          {renderInput("email", "email", "Email Address", Mail, "email")}
          {renderInput("password", "password", "Password", Lock, "password")}
          {renderInput("phone", "text", "Phone Number", Phone, "phone")}
          {renderInput("dob", "date", "Date of Birth", Calendar, "dob")}

          <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md mt-2">
            Register Account
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;