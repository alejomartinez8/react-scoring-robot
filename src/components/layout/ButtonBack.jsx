import React from "react";
import { useHistory } from "react-router-dom";

const ButtonBack = ({ ...rest }) => {
  let history = useHistory();
  // console.log(rest, rest.className, rest.children);

  const handleGoBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <button onClick={handleGoBack} className={rest.className}>
      {rest.children}
    </button>
  );
};

export default ButtonBack;
