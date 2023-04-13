import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';

const endpoint = `${API_HOST_PREFIX}/api/profiles/civilian`;

const get = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const searchPaginated = (pageIndex, pageSize, query) => {
    const config = {
        method: "GET",
        url: endpoint + `/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}
const getById = (id) => {
    const config = {
        method: 'GET',
        url: endpoint + `/${id}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const add = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const update = (payload, id) => {
    const config = {
        method: 'PUT',
        url: `${endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const deleteById = (id) => {
    const config = {
        method: 'DELETE',
        url: `${endpoint}/${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};



const civilianProfileService = { get, getById, add, update, deleteById, searchPaginated };
export default civilianProfileService;