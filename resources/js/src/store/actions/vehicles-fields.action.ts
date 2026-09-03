import { getVehiclesFields } from "../thunks/vehicles-fields.thunk";

export const VEHICLES_FIELDS_LOADING = "VEHICLES_FIELDS_LOADING";
export const VEHICLES_FIELDS_SUCCESS = "VEHICLES_FIELDS_SUCCESS";
export const VEHICLES_FIELDS_ERROR = "VEHICLES_FIELDS_ERROR";

const vehiclesFieldsAction = {
    getVehiclesFields,
};

export default vehiclesFieldsAction;
