import {
    createOwner,
    deleteOwner,
    getOwner,
    getOwners,
    updateOwner,
} from "../thunks/owners.thunk";

export const OWNERS_LOADING = "OWNERS_LOADING";
export const OWNERS_SUCCESS = "OWNERS_SUCCESS";
export const OWNERS_ERROR = "OWNERS_ERROR";

export const OWNER_SUCCESS = "OWNER_SUCCESS";
export const OWNER_CREATE_SUCCESS = "OWNER_CREATE_SUCCESS";
export const OWNER_UPDATE_SUCCESS = "OWNER_UPDATE_SUCCESS";
export const OWNER_DELETE_SUCCESS = "OWNER_DELETE_SUCCESS";

const ownersAction = {
    getOwners,
    getOwner,
    createOwner,
    updateOwner,
    deleteOwner,
};

export default ownersAction;
