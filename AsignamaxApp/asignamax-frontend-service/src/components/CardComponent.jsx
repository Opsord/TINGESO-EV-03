import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "../css/Card.css";

function CustomCard({ cardConfig }) {
  const {
    title,
    bodyContent,
    imageUrl,
    buttonLabel = "Go somewhere",
  } = cardConfig;

  return (
    <Card style={{ width: "18rem" }} className="CardGlobal">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title className="CardTitle">{title}</Card.Title>
        <Card.Text>{bodyContent}</Card.Text>
        <Button variant="primary">{buttonLabel}</Button>
      </Card.Body>
    </Card>
  );
}

CustomCard.propTypes = {
  cardConfig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyContent: PropTypes.string,
    imageUrl: PropTypes.string,
    buttonLabel: PropTypes.string,
  }).isRequired,
};

export default CustomCard;
