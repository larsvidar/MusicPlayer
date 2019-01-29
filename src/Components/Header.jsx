import React from "react";
import PropTypes from "prop-types";

/***** HEADER component *****/
export default function Header(props) {
    return (
      <div className="header">
        <h1>{props.title}</h1>
      </div>
      );
  }
  
  Header.propTypes = {
    title: PropTypes.string.isRequired
  };