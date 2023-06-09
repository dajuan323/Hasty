import React from 'react';
import PropTypes from 'prop-types';
import './civiliandashboard.css';
import { Link } from 'react-router-dom';
import { Smartphone, Mail, Map, Edit } from 'react-feather';

function CivilianProfile(props) {
  const { civilian } = props;
  return (
    <>
      <div className=" height-lord ">
        <div className="row">
          <div className="col-lg-12 col-xlg-7 col-md-10">
            <div className="card height-lord ">
              <div>
                <center>
                  {' '}
                  <img src={civilian?.avatarUrl} alt="LandLord-img" className="img-lord mt-2" />
                  <h4 className="card-title mt-2 ">
                    {civilian.firstName} {civilian.lastName}
                  </h4>
                  <p className="card-subtitle">
                    Property Manager{' '}
                    <Link to="/profile">
                      <Edit className="edit-item-icon" size="15px" />
                    </Link>
                  </p>
                </center>
              </div>
              <div className="card-body">
                <p className="mt-2 mb-0">
                  <Mail className="me-1" />
                  <strong>Email Address </strong>
                </p>
                <p className="text-muted">{civilian.email}</p>
                <p className="mt-2 mb-0">
                  <Smartphone className=" me-1 " />
                  <strong>Phone</strong>
                </p>
                <p className="text-muted">+1 654 784 547</p>
                <p className="mt-2 mb-0">
                  <Map />
                  <strong> Location</strong>
                </p>
                <p className="text-muted">California, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
CivilianProfile.propTypes = {
  civilian: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
};
export default CivilianProfile;
