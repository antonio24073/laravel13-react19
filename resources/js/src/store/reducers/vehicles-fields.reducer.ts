import type { AnyAction } from "redux";
import type { VehicleFieldsState } from "../../models/vehicles-fields.types";
import {
    VEHICLES_FIELDS_ERROR,
    VEHICLES_FIELDS_LOADING,
    VEHICLES_FIELDS_SUCCESS,
} from "../actions/vehicles-fields.action";

const initialState: VehicleFieldsState = {
    vehicleFields: {
        vehicle_types: [],
        regdate: [],
        gearbox: [],
        fuel: [],
        car_steering: [],
        motorpower: [],
        doors: [],
        features: [],
        exchange: [],
        financial: [],
        cubiccms: [],
    },
    loading: false,
    error: null,
};

export default function vehiclesFieldsReducer(
    state = initialState,
    action: AnyAction
): VehicleFieldsState {
    switch (action.type) {
        case VEHICLES_FIELDS_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case VEHICLES_FIELDS_SUCCESS:
            return {
                ...state,
                loading: false,
                vehicleFields: {
                    ...state.vehicleFields,
                    ...action.payload,
                },
            };

        case VEHICLES_FIELDS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
