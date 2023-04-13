import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CivilianProfile from './CivilianProfile';
import CivilianCalendar from './CivilianCalendar';
import Analytics from './Analytics';
import * as userService from '../../../services/userService';
import './civiliandashboard.css';
import Header from '../../../components/elements/Header';
import toastr from 'toastr';
import CivilianFiles from './CivilianFiles';

function CivilianDashboard() {
  const [civilianData, setCivilianData] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    mi: '',
    email: '',
    avatarUrl: '',
    roles: [],
  });
  const crumbs = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Civilian', path: '/dashboard/civilian' },
  ];
  useEffect(() => {
    userService.getUserDetails().then(ongGetUserSuccess).catch(onGetUserError);
  }, []);

  const ongGetUserSuccess = (response) => {
    const civilian = response.item;
    setCivilianData((prevState) => {
      return {
        ...prevState,
        ...civilian,
      };
    });
  };

  const onGetUserError = () => {
    toastr.error('Error Retrieving User Info');
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Header title="Dashboard" crumbs={crumbs} />
          </Col>
        </Row>
        <Row>
          <Row>
            <Col className="col-sm-12 col-lg-8">
              <CivilianCalendar />
            </Col>
            <Col className="col-sm-12 col-lg-4">
              <CivilianProfile civilian={civilianData} />
            </Col>
          </Row>
          <Col className="col-sm-12 col-lg-8">
            <CivilianFiles />
          </Col>
          <Col className="col-sm-12 col-lg-4">
            <Analytics />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CivilianDashboard;
