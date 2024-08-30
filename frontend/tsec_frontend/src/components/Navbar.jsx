import React from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
      toast.success('Successfully signed out!');
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-green-700 via-green-500 to-green-300 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold cursor-pointer flex items-center space-x-2"
          onClick={() => navigate('/dashboard')}
        >
          <img 
            src="https://via.placeholder.com/40" 
            alt="Logo" 
            className="w-10 h-10 rounded-full"
          />
          <span>KisanMitra</span>
        </motion.div>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="text-lg">
                Namaste, {user.displayName || 'User'}!
              </div>
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={user.photoURL || 'https://via.placeholder.com/40'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-emerald-100"
                onClick={handleSignOut}
              >
                Sign Out
              </motion.button>
            </>
          )}
        </div>  
      </div>
    </motion.nav>
  );
};

export default Navbar;
