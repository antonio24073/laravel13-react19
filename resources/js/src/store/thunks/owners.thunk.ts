import type { Dispatch } from "@reduxjs/toolkit";
import { HttpAuth } from "../../config/Http";
import type { OwnerPayload } from "../../models/owners.types";
import {
    OWNER_CREATE_SUCCESS,
    OWNER_DELETE_SUCCESS,
    OWNER_SUCCESS,
    OWNER_UPDATE_SUCCESS,
    OWNERS_ERROR,
    OWNERS_LOADING,
    OWNERS_SUCCESS,
} from "../actions/owners.action";

const errorMessage = (error: any, fallback: string): string => {
    const message = error.response?.data?.message;
    if (typeof message === "string") {
        return message;
    }

    const errors = error.response?.data?.errors;
    if (errors && typeof errors === "object") {
        const firstError = Object.values(errors).flat()[0];
        if (typeof firstError === "string") {
            return firstError;
        }
    }

    return fallback;
};

export const getOwners = () => async (dispatch: Dispatch) => {
    dispatch({ type: OWNERS_LOADING });

    try {
        const response = await HttpAuth.get("/owners");

        dispatch({
            type: OWNERS_SUCCESS,
            payload: response.data,
        });

        return response.data;
    } catch (error: any) {
        dispatch({
            type: OWNERS_ERROR,
            payload: errorMessage(error, "Erro ao carregar proprietários"),
        });

        throw error;
    }
};

export const getOwner = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: OWNERS_LOADING });

    try {
        const response = await HttpAuth.get(`/owners/${id}`);
        const payload = response.data;

        dispatch({
            type: OWNER_SUCCESS,
            payload,
        });

        return payload;
    } catch (error: any) {
        dispatch({
            type: OWNERS_ERROR,
            payload: errorMessage(error, "Erro ao carregar proprietário"),
        });

        throw error;
    }
};

export const createOwner = (data: OwnerPayload) => async (dispatch: Dispatch) => {
    dispatch({ type: OWNERS_LOADING });

    try {
        const response = await HttpAuth.post("/owners", data);
        const payload = response.data;

        dispatch({
            type: OWNER_CREATE_SUCCESS,
            payload,
        });

        return payload;
    } catch (error: any) {
        dispatch({
            type: OWNERS_ERROR,
            payload: errorMessage(error, "Erro ao criar proprietário"),
        });

        throw error;
    }
};

export const updateOwner = (id: number, data: OwnerPayload) => async (dispatch: Dispatch) => {
    dispatch({ type: OWNERS_LOADING });

    try {
        const response = await HttpAuth.put(`/owners/${id}`, data);
        const payload = response.data;

        dispatch({
            type: OWNER_UPDATE_SUCCESS,
            payload,
        });

        return payload;
    } catch (error: any) {
        dispatch({
            type: OWNERS_ERROR,
            payload: errorMessage(error, "Erro ao atualizar proprietário"),
        });

        throw error;
    }
};

export const deleteOwner = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: OWNERS_LOADING });

    try {
        await HttpAuth.delete(`/owners/${id}`);

        dispatch({
            type: OWNER_DELETE_SUCCESS,
            payload: id,
        });
    } catch (error: any) {
        dispatch({
            type: OWNERS_ERROR,
            payload: errorMessage(error, "Erro ao excluir proprietário"),
        });

        throw error;
    }
};
