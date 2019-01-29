import React from "react";
import PropTypes from "prop-types";

/***** MENUBUTTON component *****/
export default function MenuButton(props) {
    return(
      <i className="fa fa-bars" onClick={function() {props.onMenuClick()}}></i>
    );
  }
  
  MenuButton.propTypes = {
    onMenuClick: PropTypes.func.isRequired,
  }