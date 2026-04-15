import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('Please enter a valid email');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        const result = await register(
            formData.name, 
            formData.email, 
            formData.password,
            formData.role
        );
        setIsLoading(false);
        
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.glassCard}>
                <div style={styles.logo}>
                    <span style={styles.logoIcon}>✨</span>
                    <h1 style={styles.logoText}>Create<span style={styles.logoHighlight}>Account</span></h1>
                </div>
                <h2 style={styles.title}>Get Started</h2>
                <p style={styles.subtitle}>Join us today! It's free and easy.</p>
                
                {error && <div style={styles.error}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>👤</span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>📧</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>🔒</span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Min. 6 characters"
                            />
                        </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>✓</span>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Account Type</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>👔</span>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="user">Regular User</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        style={isLoading ? styles.buttonDisabled : styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                
                <p style={styles.link}>
                    Already have an account? <a href="/login" style={styles.linkText}>Sign In</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    glassCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    },
    logo: {
        textAlign: 'center',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    logoIcon: { fontSize: '36px' },
    logoText: { fontSize: '28px', fontWeight: '700', color: '#333' },
    logoHighlight: { color: '#667eea' },
    title: { textAlign: 'center', fontSize: '28px', color: '#333', marginBottom: '10px' },
    subtitle: { textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '14px' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500', fontSize: '14px' },
    inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    inputIcon: { position: 'absolute', left: '15px', fontSize: '18px' },
    input: {
        width: '100%',
        padding: '12px 15px 12px 45px',
        border: '2px solid #e1e5e9',
        borderRadius: '12px',
        fontSize: '16px',
        outline: 'none',
    },
    select: {
        width: '100%',
        padding: '12px 15px 12px 45px',
        border: '2px solid #e1e5e9',
        borderRadius: '12px',
        fontSize: '16px',
        outline: 'none',
        background: 'white',
        cursor: 'pointer',
    },
    button: {
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '10px',
    },
    buttonDisabled: {
        width: '100%',
        padding: '14px',
        background: '#ccc',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'not-allowed',
        marginTop: '10px',
    },
    error: {
        backgroundColor: '#fee',
        color: '#dc3545',
        padding: '12px',
        borderRadius: '12px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '14px',
    },
    link: { textAlign: 'center', marginTop: '25px', color: '#666', fontSize: '14px' },
    linkText: { color: '#667eea', fontWeight: '600' },
};

export default Register;