import { createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from '../thunks/vehicles.thunk';


export const VEHICLES_LOADING = "VEHICLES_LOADING";
export const VEHICLES_SUCCESS = "VEHICLES_SUCCESS";
export const VEHICLES_ERROR = "VEHICLES_ERROR";

export const VEHICLE_SUCCESS = "VEHICLE_SUCCESS";

export const VEHICLE_CREATE_SUCCESS = "VEHICLE_CREATE_SUCCESS";
export const VEHICLE_UPDATE_SUCCESS = "VEHICLE_UPDATE_SUCCESS";
export const VEHICLE_DELETE_SUCCESS = "VEHICLE_DELETE_SUCCESS";

const vehiclesAction = {
    getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle
};

export default vehiclesAction;