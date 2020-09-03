import React, { useEffect } from "react"
import queryString from "query-string"
import { userServices } from "../../redux/services"
import { connect } from "react-redux"
import { setAlert } from "../../redux/actions/alert.actions"
import Alert from "../../components/layout/Alert"

const VerifyEmail = ({ setAlert, history }) => {
  useEffect(() => {
    const { token } = queryString.parse(history.location.search)

    //remove token from url
    // history.replace(history.location.pathname)

    userServices
      .verifyEmail(token)
      .then((res) => {
        console.log(res)
        setAlert(res.message, "success")
        history.push("login")
      })
      .catch((error) => {
        console.log(error)
        setAlert("Verificación no válida", "danger")
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container d-flex flex-column ">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="text-center">
            <h3 className="m-3">Verificar Email</h3>
            Verificando...
            <Alert />
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(null, { setAlert })(VerifyEmail)
