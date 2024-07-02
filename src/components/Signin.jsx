import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { signin } from '../services/Userservices';
import signlogo from '../assets/google2.png'
import { useNavigate } from 'react-router-dom';

const Signin = () => {

    const navigate =useNavigate();
 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^\S+@\S+\.\S+$/;
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }

    const obj = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await signin(obj);
      console.log(response);
      localStorage.setItem('name', response.data.firstName);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('token', response.data.id);
      navigate('/')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex h-[720px] w-full flex-col items-center justify-center'>
      <div className='w-[340px] xl:w-[455.75px] h-[505px] flex flex-col items-center gap-[30px] border rounded-[10px] border-solid border-[#7777]'>
        <div className='text-center'>
          <img className="ml-[55px] w-[80px] h-[80px]" src={signlogo} alt="Google Logo" />
          <h3 className='text-2xl font-medium m-0'>Sign in</h3>
          <p className='mt-[18px]'>Use your Google Account</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-[10px]">
          <div className='w-4/5 flex flex-col'>
            <TextField
              className="w-full"
              id="email"
              variant="outlined"
              label="Email or Phone *"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <a href="/" className="mt-1 text-blue-600 text-sm">Forgot email?</a>
          </div>
          <div className='w-4/5 flex flex-col'>
            <TextField
              id='password'
              className="w-full"
              type="password"
              label="Password *"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <a href="/" className="mt-1 text-blue-600 text-sm">Forgot password?</a>
          </div>
          <div className='w-4/5 flex flex-col'>
            <p className="text-xs text-slate-500">Not your computer? Use Guest mode to sign in privately.</p>
            <a href="/" className='text-blue-600 mt-1'>Learn more</a>
          </div>
          <div className='w-4/5 flex justify-between items-center mt-[10px]'>
            <a href="/signup" className='text-blue-600'>Create account</a>
            <Button id='login-btn' type='submit' variant="contained">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
