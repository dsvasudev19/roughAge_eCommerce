import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function Frequent() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>From where you get Naturally Grown food ?</Accordion.Header>
        <Accordion.Body>
          Our farm is located in Hyderabad and we have a collaboration with more than 200+ farmers and they
                        are farming the foods under our guidance
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How much is your processing time from farm to customer?</Accordion.Header>
        <Accordion.Body>
          All of our products are processed within one day after getting them from the farm .
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>How much is your processing time from farm to customer?</Accordion.Header>
        <Accordion.Body>
          All of our products are processed within one day after getting them from the farm .
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Frequent;