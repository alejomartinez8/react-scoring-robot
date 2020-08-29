import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../redux/actions/alert.actions';
import Alert from '../../components/layout/Alert';

const initialState = {
  email: ''
};

const ForgotPassword = ({ setAlert }) => {
  const [formData, setformData] = useState(initialState);
  const { email } = formData;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email es inválido').required('Email requerido')
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData)
      .then(function (data) {
        console.log('Correo enviado a:', data);
        setAlert(`Correo enviado ${data.email}. Revisa tu correo electrónico`, 'success');
      })
      .catch(function (error) {
        console.log(error.errors);
        setAlert(error.errors, 'danger');
      });
  };

  return (
    <div className='container d-flex flex-column'>
      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <div className='text-center'>
            <h1 className='display-4 mb-3'>Recuperar Contraseña</h1>
          </div>
          <Alert />
          <form onSubmit={handleSubmit}>
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

            <div className='form-group'>
              <button className='btn btn-lg btn-block btn-primary mb-3'>Enviar</button>
              <p className='text-center'>
                <small className='text-muted'>
                  <Link to='/login'>Cancelar</Link>
                </small>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(ForgotPassword);
