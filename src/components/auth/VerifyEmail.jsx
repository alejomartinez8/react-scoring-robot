import React, { useEffect } from "react";
import queryString from "query-string";
import { authServices } from "../../redux/services";
import { connect } from "react-redux";
import { alertActions } from "../../redux/actions/";

const VerifyEmail = ({ setAlert, history }) => {
  useEffect(() => {
    const { token } = queryString.parse(history.location.search);

    //remove token from url
    history.replace(history.location.pathname);

    authServices
      .verifyEmail(token)
      .then((res) => {
        console.log(res);
        setAlert(res.message, "success");
        history.push("login");
      })
      .catch((error) => {
        console.log(error);
        setAlert("Verificación no válida", "danger");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-lg-6">
        <div className="card">
          <div className="card-header">
            <h3 className="m-3">Verificar Email</h3>
          </div>
          <div className="card-body">Verificando...</div>
        </div>
      </div>
    </div>
  );
};

const actionsCreators = {
  setAlert: alertActions.setAlert,
};

export default connect(null, actionsCreators)(VerifyEmail);
