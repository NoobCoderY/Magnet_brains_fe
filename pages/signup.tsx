'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { log } from 'console';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: { name: string; email: string; password: string } = { name: '', email: '', password: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length !== 0;
  };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      
      
        e.preventDefault();
        console.log('form data:', validateForm());
      try {
          if (validateForm()) {
               
             const response = await axios.post(
               `${process.env.NEXT_PUBLIC_API_URL}/register`,
               formData
             );
              router.push('/login');
           
           }
        
      } catch (error:any) {
        toast.error(error.response.data.err);
      }

   
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        marginTop: 8,
        padding: 4,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography
        variant='h5'
        gutterBottom
      >
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Password'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin='normal'
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          style={{ backgroundColor: '#006D77' }}
          sx={{ marginTop: 2 }}
        >
          Signup
        </Button>
      </form>

      <Typography
        variant='body2'
        sx={{ marginTop: 2, cursor: 'pointer', color: 'blue' }}
        onClick={() => router.push('/login')}
      >
        Already have an account? Login here.
      </Typography>
    </Box>
  );
};

export default Signup;
