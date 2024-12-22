import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from 'axios';
const About = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: { email: string; password: string } = {
      email: '',
      password: '',
    };

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

    try {
      if (validateForm()) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          formData
        );
        const authData = response.data;
        if (authData) {
          if (typeof window !== 'undefined') {
            {
              localStorage.setItem(
                'magnet_brains_auth_token',
                JSON.stringify(authData)
              );
            }
            router.push('/');
          }
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.err);
    }
  };

  return (
    <>
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
            sx={{ marginTop: 2 }}
            style={{ backgroundColor: '#006D77' }}
          >
            Login
          </Button>
        </form>

        <Typography
          variant='body2'
          sx={{ marginTop: 2, cursor: 'pointer', color: 'blue' }}
          onClick={() => router.push('/signup')}
        >
          Don&apos;t have an account? Signup here.
        </Typography>
      </Box>
    </>
  );
};

export default About;
