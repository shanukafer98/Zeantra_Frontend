import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password matching
    const navigate = useNavigate();

    const validatePassword = (password) => {
        // At least one lower case letter, one upper case letter, one digit, one special character, and be at least 8 characters long
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            toast('Password must contain at least one lower case letter, one upper case letter, one digit, one special character, and be at least 8 characters long',{duration: 3000});
            return;
        }

        if (password === confirmPassword) {
            console.log(username, email, password);
            // Proceed with form submission

            Axios.post(`${process.env.ENDPOINT}/UserRegistration`, { username, email, password })
                .then(response => {
                    if (response.data.message === 'User registered successfully') {
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setPasswordsMatch(true);
                        toast.success('User registered successfully!');
                        navigate('/');
                    }
                }).catch(err => {
                    if (err.response && err.response.status === 400) {
                        // Username already exists error
                     toast.error(err.response.data.detail);
                    } else {
                        // Other errors
                        console.log(err);
                    }
                });
        } else {
            setPasswordsMatch(false);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto space-y-4 p-6 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold">Sign up</h2>
                <label htmlFor='username' className="sr-only">Username</label>
                <input type='text' placeholder='Username or Company name' value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />

                <label htmlFor='email' className="sr-only">Email</label>
                <input type='email' autoComplete='off' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />

                <label htmlFor='password' className="sr-only">Password</label>
                <input type='password' placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />

                <label htmlFor='confirmPassword' className="sr-only">Re-type password</label>
                <input type='password' placeholder='******' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />

                {!passwordsMatch && <p className="text-red-500">Passwords do not match!</p>}

                <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">Sign up</button>
                <p>Have an Account? <Link to="/" className="text-blue-500">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;
