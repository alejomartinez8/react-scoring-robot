import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'reaact-redux';

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.lenght > 0 &&
  alert.map((alert) => {
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>;
  });

Alert.propTypes = {};

export default Alert;
