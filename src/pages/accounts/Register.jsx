import React from 'react';

const Register = () => {
  return (
    <div className='container-fluid px-3'>
      <div className='row min-vh-100'>
        <div className='col-md-5 col-lg-6 col-xl-4 px-lg-5 d-flex align-items-center'>
          <div className='w-100 py-5'>
            <div className='text-center'>
              <h1 className='display-4 mb-3'>Registro</h1>
              <p className='text-muted'>Bienvenido a la Plataforma de Scoring Robot Pygmalion</p>
            </div>

            <form>
              <div className='form-group'>
                <label>Email</label>
                <input className='form-control' type='email' name='email' required />
              </div>
              <div className='form-group mb-4'>
                <label>Contraseña</label>
                <input type='password' name='password' required className='form-control' />
              </div>
              <div className='form-group mb-4'>
                <label>Confirmar Contraseña</label>
                <input type='password' name='confirmPassword' required className='form-control' />
              </div>
              <div className='form-group terms-conditions mb-4'>
                <input
                  id='register-agree'
                  name='registerAgree'
                  type='checkbox'
                  required
                  value='1'
                  className='form-control-custom'
                />{' '}
                <label for='register-agree'>Acepto Términos y Condiciones </label>
              </div>

              <button className='btn btn-lg btn-block btn-primary mb-3'>Registrar</button>

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

export default Register;
