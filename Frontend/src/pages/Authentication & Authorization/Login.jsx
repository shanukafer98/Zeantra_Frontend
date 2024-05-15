import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Authentication';

const Login = () => {
    const { setIsAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/UserValidation', { email, password })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                    alert('Login successful!');
                    setIsAuthenticated(true); // Update isAuthenticated to true
                    navigate('/dashboard');
                } else {
                    setLoginError(true);
                    alert('Login Failed! Invalid Credentials!');

                }
            }).catch(err => {
              
                alert('Login Failed! Invalid Credentials!');

            });
    };


    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto space-y-4 p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold">Login</h2>
        <label htmlFor='email-address' className="sr-only">Email address</label>
        <input id='email-address' name='email' type='email' autoComplete='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />

        <label htmlFor='password' className="sr-only">Password</label>
        <input id='password' name='password' type='password' autoComplete='current-password' placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />

        {loginError && <p className="text-red-500">Invalid email or password!</p>}

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">Login</button>
        <p>Don't have an Account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
    </form>
</div>
    );
};

export default Login;