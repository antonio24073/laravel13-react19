import type { AnyAction } from "redux";

import type { VehiclesState } from "../../models/vehicles.types";

import { VEHICLE_CREATE_SUCCESS, VEHICLE_DELETE_PHOTO_SUCCESS, VEHICLE_DELETE_SUCCESS, VEHICLE_REORDER_PHOTO_SUCCESS, VEHICLE_SUCCESS, VEHICLE_UPDATE_SUCCESS, VEHICLE_UPLOAD_PHOTO_SUCCESS, VEHICLES_ERROR, VEHICLES_LOADING, VEHICLES_SUCCESS } from "../actions/vehicles.action";

const photosFrom = (value: unknown): string[] => Array.isArray(value) ? value as string[] : [];

const initialState: VehiclesState = {
    vehicles: [],
    vehicle: null,
    photos: [],
    loading: false,
    error: null,
};

export default function vehiclesReducer(
    state = initialState,
    action: AnyAction
): VehiclesState {
    switch (action.type) {
        case VEHICLES_LOADING:

            return {
                ...state,
                loading: true,
                error: null,
            };

        case VEHICLES_SUCCESS: {
            const vehicles = Array.isArray(action.payload)
                ? action.payload
                : action.payload?.vehicles ?? [];

            return {
                ...state,
                loading: false,
                vehicles,
            };
        }

        case VEHICLE_SUCCESS: {
            const vehicle = action.payload?.vehicle ?? action.payload ?? null;

            return {
                ...state,
                loading: false,
                vehicle,
            };
        }

        case VEHICLE_CREATE_SUCCESS: {
            const vehicle = action.payload?.vehicle ?? action.payload;

            return {
                ...state,
                loading: false,
                vehicles: vehicle ? [
                    ...state.vehicles,
                    vehicle,
                ] : state.vehicles,
                vehicle,
            };
        }

        case VEHICLE_UPDATE_SUCCESS: {
            const vehicle = action.payload?.vehicle ?? action.payload;

            return {
                ...state,
                loading: false,
                vehicles: state.vehicles.map((currentVehicle) =>
                    currentVehicle.id === vehicle?.id
                        ? vehicle
                        : currentVehicle
                ),
                vehicle,
            };
        }
        case VEHICLE_DELETE_SUCCESS:

            return {
                ...state,
                loading: false,
                vehicles: state.vehicles.filter(
                    (vehicle) => vehicle.id !== action.payload
                ),
            };

        case VEHICLE_UPLOAD_PHOTO_SUCCESS:

            return {
                ...state,
                loading: false,
                vehicle: state.vehicle
                    ? {
                        ...state.vehicle,
                        photos: [
                            ...photosFrom(state.vehicle.photos),
                            ...photosFrom(action.payload?.photos),
                            ...(action.payload?.data ? [action.payload.data] : []),
                        ],
                        vehicle_photos: action.payload?.photo
                            ? [...(state.vehicle.vehicle_photos ?? []), action.payload.photo]
                            : state.vehicle.vehicle_photos,
                    }
                    : null,
            };

        case VEHICLE_DELETE_PHOTO_SUCCESS:
            
            return {
                ...state,
                loading: false,
                vehicle: state.vehicle
                    ? {
                        ...state.vehicle,
                        photos: photosFrom(state.vehicle.photos).filter(
                            (photo) => photo !== action.payload
                        ),
                        vehicle_photos: (state.vehicle.vehicle_photos ?? []).filter(
                            (photo) => photo.id !== action.payload
                        ),
                    }
                    : null,
            };

        case VEHICLE_REORDER_PHOTO_SUCCESS:

            return {
                ...state,
                loading: false,
                vehicle: state.vehicle
                    ? {
                        ...state.vehicle,
                        photos: action.payload?.photos ?? state.vehicle.photos,
                        vehicle_photos: action.payload?.photos ?? state.vehicle.vehicle_photos,
                    }
                    : null,
            };

        case VEHICLES_ERROR:

            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}