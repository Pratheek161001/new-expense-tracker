import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from './actions';
import Form from 'react-bootstrap/Form';


const ThemeToggle = ({ currentTheme, toggleTheme }) => {
  return (
    <Form.Check // prettier-ignore
    type="switch"
    id="custom-switch"
    label=" Theme"
    onClick={toggleTheme}
  />
  );
};

const mapStateToProps = (state) => {
  return {
    currentTheme: state.theme,
  };
};

const mapDispatchToProps = {
  toggleTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);