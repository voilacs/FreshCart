import React, { useState } from 'react';

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const loginFunction = async (event) => {
        event.preventDefault();
        try {
            await handleLogin({
                username,
                password,
            });
        } catch (exception) {
            setError('Invalid username or password');
        }
    }
    

    return (
        <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <h2>Login</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={loginFunction}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</div>
    );
};

export default LoginForm;
