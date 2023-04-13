import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { userSettingsSchema } from '../../schemas/userSettingsSchema';
import PropTypes from 'prop-types';
import * as userService from '../../services/userService';
import civilianProfileService from '../../services/civilianProfileService';
import * as dateFormatter from '../../utils/dateFormater';
import './civilianprofilestyle.css';
import swal from 'sweetalert2';
import toastr from 'toastr';

function CivilianForm(props) {
  const [cardData, setCard] = useState({
    monthlyIncome: '',
    moveInDate: dateFormatter.formatDateInput(new Date().toString()),
    id: '',
  });

  useEffect(() => {
    userService.getCurrentUser().then(getCivilianInfo).catch(useEffectGetUserError);
  }, []);

  const getCivilianInfo = (response) => {
    let civilianId = response.item.id;
    civilianProfileService.getById(civilianId).then(getCivilianInfoSuccess).catch(getCivilianInfoError);
  };

  const useEffectGetUserError = () => swal.fire('Error', 'Failed to retrieve User Information', 'error');

  const getCivilianInfoSuccess = (response) => {
    let civilian = response.item;
    setCard((prevState) => {
      let newCard = { prevState };
      newCard.monthlyIncome = civilian.monthlyIncome;
      newCard.moveInDate = dateFormatter.formatDateInput(civilian.moveInDate).toString();
      newCard.id = civilian.user.id;

      return newCard;
    });
  };
  const getCivilianInfoError = () => {
    toastr.error('Failed to retrieve civilian information');
  };

  const setIncome = (e) => {
    setCard((prevState) => {
      let newCard = { prevState };
      newCard.monthlyIncome = e.target.value;
      newCard.moveInDate = prevState.moveInDate;
      newCard.id = prevState.id;

      return newCard;
    });
  };
  const setDate = (e) => {
    setCard((prevState) => {
      let newCard = { prevState };
      newCard.monthlyIncome = prevState.monthlyIncome;
      newCard.moveInDate = e.target.value;
      newCard.id = prevState.id;

      return newCard;
    });
  };

  const updateCivilianInfo = () => {
    let subData = { monthlyIncome: cardData.monthlyIncome, moveInDate: cardData.moveInDate };
    civilianProfileService.update(subData, cardData.id).then(updateCivilianInfoSuccess).catch(updateCivilianInfoError);
  };
  const updateCivilianInfoSuccess = () => {
    toastr.success('Civilian profile updated successfully!');
  };

  const updateCivilianInfoError = () => {
    swal.fire('Error', 'Update unsuccessful', 'error');
  };

  return (
    <div className="container-fluid">
      <Formik
        enableReinitialize={true}
        initialValues={props.profileData}
        onSubmit={updateCivilianInfo}
        validationSchema={userSettingsSchema}>
        <Form>
          <h5 className="mb-4 text-uppercase">
            <i className="mdi mdi-account-circle me-1"></i>
            Edit Personal Info
          </h5>
          <div className="row flex">
            <div className="row flex">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Monthly Income</label>
                  <input
                    name="monthlyIncome"
                    type="text"
                    value={cardData.monthlyIncome}
                    placeholder="Enter income"
                    className="a-civi-form-input"
                    onChange={setIncome}
                  />
                  <ErrorMessage name="monthlyIncome" component="div" className="user-register-error-form" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Move-In Date</label>
                  <input
                    name="moveInDate"
                    type="date"
                    value={cardData.moveInDate}
                    placeholder="Enter move-in date"
                    className="a-civi-form-input"
                    onChange={setDate}
                  />
                  <ErrorMessage name="moveIn" component="div" className="user-register-error-form" />
                </div>
              </div>
            </div>
          </div>
          <div className="row flex">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Civilian Preferences</label>
                <textarea
                  name="userbio"
                  type="text"
                  placeholder="Place holder for other civilian housing preferences?"
                  rows="4"
                  className="form-control"></textarea>
              </div>
            </div>
          </div>
          <div className="text-end">
            <button type="submit" name="submit" className="btn btn-success mt-2 mb-3">
              <i className="mdi mdi-content-save"></i>
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

CivilianForm.propTypes = {
  profileData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    mi: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
};

export default CivilianForm;
