import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import queryString from "query-string"
import { userServices } from "../../redux/services"

const VerifyEmail = ({ history }) => {
  const EmailStatus = {
    Verifying: "Verifying",
    Sucess: "Succes",
    Failed: "Failed",
  }

  const [emailStatus, SetEmailStatus] = useState(EmailStatus.Verifying)

  useEffect(() => {
    const { token } = queryString.parse(history.location.search)

    //remove token from url
    history.replace(history.location.pathname)

    userServices.verifyEmail(token).then(
      (res) => {
        SetEmailStatus(EmailStatus.Success)
        history.push("login")
      },
      () => {
        SetEmailStatus(EmailStatus.Failed)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getBody = () => {
    switch (emailStatus) {
      case EmailStatus.Success:
        return (
          <div className={`alert alert-success`}>
            Correo validado puedes ingresar <Link to="login">Aquí</Link>
          </div>
        )
      case EmailStatus.Failed:
        return (
          <div className={`alert alert-danger`}>
            Token no válido vuelve a solicitarlo nuevamente aquí{" "}
            <Link to="forgot-password">Aquí</Link>
          </div>
        )
      default:
        return <div>Verificando...</div>
    }
  }

  return (
    <div className="container d-flex flex-column ">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="text-center">
            <h3 className="m-3">Verificar Email</h3>
            <div>{getBody()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
