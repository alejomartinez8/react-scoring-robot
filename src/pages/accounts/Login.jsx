import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/events' />;
  }

  return (
    <div className='container-fluid px-3'>
      <div className='row min-vh-100'>
        <div className='col-md-5 col-lg-6 col-xl-4 px-lg-5 d-flex align-items-center'>
          <div className='w-100 py-5'>
            <div className='text-center'>
              <h1 className='display-4 mb-3'>Ingreso</h1>
            </div>

            <form className='form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  className='form-control'
                  type='email'
                  placeholder='name@example.com'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  required
                ></input>
              </div>

              <div className='form-group mb-4'>
                <div className='row'>
                  <div className='col'>
                    <label htmlFor='password'>Constraseña</label>
                  </div>
                  <div className='col-auto'>
                    <a className='form-text small text-muted' href='/forgot-password'>
                      Olvidaste constraseña
                    </a>
                  </div>
                </div>
                <input
                  className='form-control'
                  type='password'
                  placeholder='Contraseña'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  required
                ></input>
              </div>

              <button className='btn btn-lg btn-block btn-primary mb-3'>Ingresar</button>

              <p className='text-center'>
                <small className='text-muted'>
                  ¿Todavía no tienes cuenta? <a href='/register'>Registarse</a>
                </small>
              </p>
            </form>
          </div>
        </div>
        <div className='col-12 col-md-7 col-lg-6 col-xl-8 d-none d-md-block'>
          <div className='bg-cover h-100 mr-n3 landing'></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
