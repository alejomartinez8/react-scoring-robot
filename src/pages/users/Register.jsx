import React, { useState } from 'react';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../redux/actions/alert.actions';
import { register } from '../../redux/actions/user.actions';
import Alert from '../../components/layout/Alert';

const Register = ({ isAuth, register, setAlert }) => {
  const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Nombres requeridos'),
    lastName: Yup.string().required('Apellidos requeridos'),
    email: Yup.string().email('Email no válido').required('Email requerido'),
    password: Yup.string()
      .min(6, 'Contraseña mínimo de 6 caracteres')
      .required('Contraseña requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Constraseñas deben coincidir')
      .required('Confirma la constraseña'),
    acceptTerms: Yup.bool().oneOf([true], 'Acepta los términos y referencias')
  });

  const [formData, setformData] = useState(initialState);

  const { email, firstName, lastName, password, confirmPassword, acceptTerms } = formData;

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData)
      .then(function (userValid) {
        register(userValid);
      })
      .catch(function (error) {
        console.log(error.errors);
        setAlert(error.errors, 'danger');
      });
  };

  if (isAuth) {
    return <Redirect to='/events' />;
  }

  return (
    <div className='container-fluid px-3'>
      <div className='row min-vh-100'>
        <div className='col-md-5 col-lg-6 col-xl-4 px-lg-5 d-flex align-items-center'>
          <div className='w-100 py-5'>
            <div className='text-center'>
              <h1 className='display-4 mb-3'>Registro</h1>
              <p className='text-muted'>Bienvenido a la Plataforma de Scoring Robot Pygmalion</p>
            </div>

            <form className='form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Nombres*</label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Nombres'
                  name='firstName'
                  value={firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Apellidos*</label>
                <input
                  className='form-control'
                  type='text'
                  name='lastName'
                  value={lastName}
                  onChange={handleChange}
                  placeholder='Nombres'
                  required
                />
              </div>
              <div className='form-group'>
                <label>Email*</label>
                <input
                  className='form-control'
                  type='email'
                  placeholder='nombre@example.com'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group mb-4'>
                <label>Contraseña*</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Contraseña'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group mb-4'>
                <label>Confirmar Contraseña*</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Confirmar Contraseña'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group terms-conditions mb-4'>
                <input
                  id='register-agree'
                  name='accepTerms'
                  type='checkbox'
                  required
                  checked={acceptTerms}
                  className='form-control-custom'
                  onChange={() => setformData({ ...formData, acceptTerms: !formData.acceptTerms })}
                />{' '}
                <label htmlFor='register-agree'> Acepto Términos y Condiciones </label>
              </div>

              <button className='btn btn-lg btn-block btn-primary mb-3'>Registrar</button>
              <Alert />

              <p className='text-center'>
                <small className='text-muted text-center'>
                  ¿Ya tienes cuenta? <a href='/login'>Ingresar</a>.
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

Register.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { register, setAlert })(Register);
