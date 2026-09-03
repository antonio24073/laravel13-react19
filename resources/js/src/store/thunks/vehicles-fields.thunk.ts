import type { Dispatch } from "@reduxjs/toolkit";
import { HttpAuth } from "../../config/Http";
import { VEHICLES_FIELDS_ERROR, VEHICLES_FIELDS_LOADING, VEHICLES_FIELDS_SUCCESS } from "../actions/vehicles-fields.action";

export const getVehiclesFields = () => async (dispatch: Dispatch) => {
    dispatch({
        type: VEHICLES_FIELDS_LOADING,
    });

    try {
        const response = await HttpAuth.get("/vehicles-fields");
        const payload = response.data ?? {};

        dispatch({
            type: VEHICLES_FIELDS_SUCCESS,
            payload,
        });

        return payload;
    } catch (error: any) {
        dispatch({
            type: VEHICLES_FIELDS_ERROR,
            payload: error.response?.data?.message ?? "Error loading vehicle fields",
        });

        throw error;
    }
};
