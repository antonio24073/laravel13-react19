import type { Dispatch } from "@reduxjs/toolkit";
import { VEHICLE_CREATE_SUCCESS, VEHICLE_DELETE_PHOTO_SUCCESS, VEHICLE_DELETE_SUCCESS, VEHICLE_REORDER_PHOTO_SUCCESS, VEHICLE_SUCCESS, VEHICLE_UPDATE_SUCCESS, VEHICLE_UPLOAD_PHOTO_SUCCESS, VEHICLES_ERROR, VEHICLES_LOADING, VEHICLES_SUCCESS } from "../actions/vehicles.action";
import { HttpAuth, HttpUpload } from "../../config/Http";
import type { VehiclePayload } from "../../models/vehicles.types";
import notifyAction from "../actions/notify.action";


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

export const uploadVehiclePhoto =
    (id: number, file: File) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: VEHICLES_LOADING,
            });

            const formData = new FormData();
            formData.append("file", file);
            formData.append("vehicle_id", String(id));
            formData.append("id", String(id));

            try {
                const response = await HttpUpload.post(`/uploads/vehicle`, formData);
                const payload = response.data;

                dispatch({
                    type: VEHICLE_UPLOAD_PHOTO_SUCCESS,
                    payload,
                });

                dispatch(notifyAction.open({ msg: "Foto do veículo enviada com sucesso!", class: "success" }));

                return payload;
            } catch (error: any) {
                const message = error.response?.data?.message ?? error.message ?? "Error uploading vehicle photo";

                dispatch({
                    type: VEHICLES_ERROR,
                    payload: message,
                });

                dispatch(notifyAction.open({ msg: message, class: "danger" }));

                throw error;
            }
        };

export const deleteVehiclePhoto =
    (id: number) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: VEHICLES_LOADING,
            });

            try {
                await HttpAuth.delete(`/uploads/vehicle/${id}`);

                dispatch({
                    type: VEHICLE_DELETE_PHOTO_SUCCESS,
                    payload: id,
                });

                dispatch(notifyAction.open({ msg: "Foto do veículo excluída com sucesso!", class: "success" }));
            } catch (error: any) {
                dispatch({
                    type: VEHICLES_ERROR,
                    payload: error.response?.data?.message ?? "Error deleting vehicle photo",
                });

                dispatch(notifyAction.open({ msg: "Erro ao excluir foto do veículo!", class: "danger" }));

                throw error;
            }
        };

export const reorderVehiclePhotos =
    (vehicleId: number, photoIds: number[]) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: VEHICLES_LOADING,
            });

            try {
                const response = await HttpAuth.put(`/uploads/vehicle/${vehicleId}`, { order: photoIds });
                const payload = response.data;

                dispatch({
                    type: VEHICLE_REORDER_PHOTO_SUCCESS,
                    payload,
                });

                dispatch(notifyAction.open({ msg: "Fotos do veículo reordenadas com sucesso!", class: "success" }));

                return payload;
            } catch (error: any) {
                dispatch({
                    type: VEHICLES_ERROR,
                    payload: error.response?.data?.message ?? "Error reordering vehicle photos",
                });

                dispatch(notifyAction.open({ msg: "Erro ao reordenar fotos do veículo!", class: "danger" }));

                throw error;
            }
        };