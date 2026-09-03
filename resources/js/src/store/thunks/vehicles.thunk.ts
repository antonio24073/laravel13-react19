import type { Dispatch } from "@reduxjs/toolkit";
import { VEHICLE_CREATE_SUCCESS, VEHICLE_DELETE_SUCCESS, VEHICLE_SUCCESS, VEHICLE_UPDATE_SUCCESS, VEHICLES_ERROR, VEHICLES_LOADING, VEHICLES_SUCCESS } from "../actions/vehicles.action";
import { HttpAuth } from "../../config/Http";
import type { VehiclePayload } from "../../models/vehicles.types";


export const getVehicles = () => async (dispatch: Dispatch) => {
    dispatch({
        type: VEHICLES_LOADING,
    });

    try {
        const response = await HttpAuth.get("/vehicles");
        const payload = Array.isArray(response.data?.vehicles)
            ? response.data.vehicles
            : response.data ?? [];

        dispatch({
            type: VEHICLES_SUCCESS,
            payload,
        });
    } catch (error: any) {
        dispatch({
            type: VEHICLES_ERROR,
            payload: error.response?.data?.message ?? "Error loading vehicles",
        });
    }
};

export const getVehicle =
    (id: number) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: VEHICLES_LOADING,
        });

        try {
            const response = await HttpAuth.get(`/vehicles/${id}`);
            const payload = response.data;

            dispatch({
                type: VEHICLE_SUCCESS,
                payload,
            });
        } catch (error: any) {
            dispatch({
                type: VEHICLES_ERROR,
                payload: error.response?.data?.message ?? "Error loading vehicle",
            });
        }
    };

export const createVehicle =
    (data: VehiclePayload) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: VEHICLES_LOADING,
        });

        try {
            const response = await HttpAuth.post("/vehicles", data);
            const payload = response.data;

            dispatch({
                type: VEHICLE_CREATE_SUCCESS,
                payload,
            });

            return payload;
        } catch (error: any) {
            dispatch({
                type: VEHICLES_ERROR,
                payload: error.response?.data?.message ?? "Error creating vehicle",
            });

            throw error;
        }
    };

export const updateVehicle =
    (id: number, data: VehiclePayload) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: VEHICLES_LOADING,
        });

        try {
            const response = await HttpAuth.put(`/vehicles/${id}`, data);
            const payload = response.data;

            dispatch({
                type: VEHICLE_UPDATE_SUCCESS,
                payload,
            });

            return payload;
        } catch (error: any) {
            dispatch({
                type: VEHICLES_ERROR,
                payload: error.response?.data?.message ?? "Error updating vehicle",
            });

            throw error;
        }
    };

export const deleteVehicle =
    (id: number) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: VEHICLES_LOADING,
        });

        try {
            await HttpAuth.delete(`/vehicles/${id}`);

            dispatch({
                type: VEHICLE_DELETE_SUCCESS,
                payload: id,
            });
        } catch (error: any) {
            dispatch({
                type: VEHICLES_ERROR,
                payload: error.response?.data?.message ?? "Error deleting vehicle",
            });

            throw error;
        }
    };