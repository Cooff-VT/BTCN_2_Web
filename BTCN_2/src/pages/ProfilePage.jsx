import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchClient } from "../api/client";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { User, Mail, Phone, Calendar, Save, Heart, LogOut } from "lucide-react";

const ProfilePage = () => {
  const { user, logout, fetchUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    email: '', phone: '', dob: ''
  });

  useEffect(() => {
    if (user) {
        setFormData({
            email: user.email || '',
            phone: user.phone || '',
            dob: user.dob ? user.dob.split('T')[0] : '' 
        });
    }
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
        await fetchClient('/users/profile', {
            method: 'PATCH',
            data: formData
        });
        
        await fetchUserProfile(); 
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
        setMessage({ type: 'error', text: error.message || 'Update failed' });
    } finally {
        setUpdating(false);
    }
  };

  if (!user) return <div className="min-h-screen bg-gray-950 pt-20"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 pt-10 transition-colors">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center border border-gray-200 dark:border-gray-800">
                <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold dark:text-white">{user.username}</h2>
                <p className="text-gray-500 text-sm">Member</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 space-y-2">
                <Link to="/favorites" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition font-medium">
                    <Heart size={20} /> My Favorites
                </Link>
                <button onClick={logout} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition font-medium">
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </div>

        <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-6 dark:text-white border-b pb-4 dark:border-gray-700">Profile Settings</h3>
                
                {message.text && (
                    <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Username (Read-only)</label>
                        <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500">
                            <User size={18} /> {user.username}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input name="email" type="email" value={formData.email} onChange={handleChange}
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input name="phone" type="text" value={formData.phone} onChange={handleChange}
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Date of Birth</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input name="dob" type="date" value={formData.dob} onChange={handleChange}
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <button disabled={updating} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50">
                        {updating ? <LoadingSpinner /> : <Save size={20} />}
                        Save Changes
                    </button>
                </form>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;