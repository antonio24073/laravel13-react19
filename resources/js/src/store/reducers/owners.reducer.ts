import type { AnyAction } from "redux";
import type { Owner, OwnersState } from "../../models/owners.types";
import {
    OWNER_CREATE_SUCCESS,
    OWNER_DELETE_SUCCESS,
    OWNER_SUCCESS,
    OWNER_UPDATE_SUCCESS,
    OWNERS_ERROR,
    OWNERS_LOADING,
    OWNERS_SUCCESS,
} from "../actions/owners.action";

const initialState: OwnersState = {
    owners: [],
    owner: null,
    pagination: null,
    loading: false,
    error: null,
};

const ownerFrom = (value: unknown): Owner | null => {
    return value && typeof value === "object" ? value as Owner : null;
};

export default function ownersReducer(
    state = initialState,
    action: AnyAction
): OwnersState {
    switch (action.type) {
        case OWNERS_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case OWNERS_SUCCESS: {
            const payload = action.payload ?? {};
            const owners = Array.isArray(payload) ? payload : payload.data ?? payload.owners ?? [];

            return {
                ...state,
                loading: false,
                owners,
                pagination: Array.isArray(payload)
                    ? null
                    : {
                        current_page: payload.current_page ?? 1,
                        last_page: payload.last_page ?? 1,
                        per_page: payload.per_page ?? owners.length,
                        total: payload.total ?? owners.length,
                    },
            };
        }

        case OWNER_SUCCESS:
            return {
                ...state,
                loading: false,
                owner: ownerFrom(action.payload?.owner ?? action.payload),
            };

        case OWNER_CREATE_SUCCESS: {
            const owner = ownerFrom(action.payload?.owner ?? action.payload);

            return {
                ...state,
                loading: false,
                owners: owner ? [...state.owners, owner] : state.owners,
                owner,
            };
        }

        case OWNER_UPDATE_SUCCESS: {
            const owner = ownerFrom(action.payload?.owner ?? action.payload);

            return {
                ...state,
                loading: false,
                owners: owner
                    ? state.owners.map((currentOwner) => currentOwner.id === owner.id ? owner : currentOwner)
                    : state.owners,
                owner,
            };
        }

        case OWNER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                owners: state.owners.filter((owner) => owner.id !== action.payload),
                owner: state.owner?.id === action.payload ? null : state.owner,
            };

        case OWNERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
