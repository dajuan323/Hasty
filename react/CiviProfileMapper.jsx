import React from 'react';
import { Card } from 'react-bootstrap';
import './civilianprofilestyle.css';
import PropTypes from 'prop-types';
import * as dateFormatter from '../../utils/dateFormater';

function CivProfileCard(props) {
  const civilian = props.civilian;

  return (
    <Card className="text-center a-civi-card">
      <div className="a-civi-card-bg">
        <Card.Body className="a-civi-card-body">
          <img src={civilian.user.avatarUrl} className="rounded-circle avatar-lg img-thumbnail" alt="" />
          <h5 className="mb-0 mt-2">
            {civilian.user.firstName} {civilian.user.mi} {civilian.user.lastName}{' '}
          </h5>
          <div className="text-start mt-3">
            <p className="text-muted mb-2 font-13">
              <strong>Monthly Income :</strong>
              <span className="ms-2">{civilian.monthlyIncome}</span>
            </p>

            <p className="text-muted mb-2 font-13">
              <strong>Move-in Date :</strong>
              <span className="ms-2 ">{dateFormatter.formatDate(civilian.moveInDate)}</span>
            </p>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}

CivProfileCard.propTypes = {
  civilian: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    monthlyIncome: PropTypes.number.isRequired,
    moveInDate: PropTypes.string.isRequired,
  }).isRequired,
};
export default CivProfileCard;
