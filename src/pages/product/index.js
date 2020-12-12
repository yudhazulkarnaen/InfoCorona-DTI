import React, { useState } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import swal from 'sweetalert';
import { setCookie } from '../../utils/cookie';
import { authService } from '../../services';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginLoading, setLoginLoading] = useState(false);

  const onSubmitLogin = () => {
    setLoginLoading(true);
    authService
      .login(username, password)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
        const cookieToken = res.token;
        const cookieUser = {
          userId: res.userId,
          username: res.username,
        };
        setCookie('userData', JSON.stringify(cookieUser), 10000);
        setCookie('token', JSON.stringify(cookieToken), 10000);
        window.location.replace('/product');
      })
      .catch((err) => {
        swal('Password Salah!', err.data.message, 'error');
        // eslint-disable-next-line no-console
        console.log(err);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <div>
      <div className="login-clean">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitLogin();
          }}
        >
          <h2>Login Form</h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Login"
              disabled={isLoginLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
