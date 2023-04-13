import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CivProfileCard from './CiviProfileMapper';
import civilianProfileServices from '../../services/civilianProfileService';
import './civilianprofilestyle.css';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination';
import toastr from 'toastr';
import Header from '../elements/Header';

function CivilianList() {
  const [pageData, setPageData] = useState({
    profileData: { arrayOfProfiles: [], profilesComponents: [] },
    pageIndex: 0,
    pageSize: 8,
    totalCount: 0,
    query: '',
  });

  const onFormFieldChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setPageData((prevState) => {
      const searchObject = { ...prevState };
      searchObject[name] = value;
      return searchObject;
    });
  };

  const onSearchClicked = (e) => {
    e.preventDefault();
    civilianProfileServices
      .searchPaginated(pageData.pageIndex, pageData.pageSize, pageData.query)
      .then(onGetCivilianSuccess)
      .catch(onGetCivilianError);
  };

  const onChange = (page) => {
    setPageData((prevState) => {
      let newIndex = { ...prevState };
      newIndex.pageIndex = page - 1;
      return newIndex;
    });
  };

  useEffect(() => {
    civilianProfileServices
      .get(pageData.pageIndex, pageData.pageSize)
      .then(onGetCivilianSuccess)
      .catch(onGetCivilianError);
  }, []);

  const mapCivilian = (civilian) => {
    return <CivProfileCard civilian={civilian} key={civilian.id} />;
  };

  const onGetCivilianSuccess = (response) => {
    const arrayProfilesTemp = response.item.pagedItems;

    setPageData((prevState) => {
      const newData = { ...prevState };
      newData.profileData.arrayOfProfiles = arrayProfilesTemp;
      newData.profileData.profileComponents = arrayProfilesTemp.map(mapCivilian);
      newData.totalCount = response.item.totalCount;
      return newData;
    });
  };

  const onGetCivilianError = () => {
    toastr.error('Error uploding Civilian Information.');
  };
  const crumbs = [
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <Header title="Military Profiles" crumbs={crumbs} />
        </Col>
      </Row>

      <div className="text-center">
        <h3 className="mb-2">Civilian Profiles</h3>
      </div>
      <hr />
      <div className="container a-lvl-one">
        <div className="row justify-content-center a-lvl-two">
          <form>
            <div className="col-3 military-profile-side-by-side">
              <input
                type="text"
                className="form-control dropdown-toggle"
                placeholder="Search..."
                id="top-search"
                name="query"
                value={pageData.query}
                onChange={onFormFieldChange}
              />
              <button className="input-group-text btn-primary" onClick={onSearchClicked} type="submit">
                Search
              </button>
            </div>
          </form>
          <p />
          <div className="paginate-cont">
            <Pagination
              onChange={onChange}
              current={pageData.pageIndex + 1}
              total={pageData.totalCount}
              pageSize={pageData.pageSize}
              locale={locale}
            />
          </div>
          <div className="col-xxl-10 a-lvl-three">
            <Row>{pageData.profileData.profileComponents}</Row>
          </div>
        </div>
      </div>
    </>
  );
}
export default CivilianList;
