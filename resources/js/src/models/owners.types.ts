export interface Owner {
    id: number;
    user_id: number | null;
    name: string | null;
    birth: string | null;
    type: number;
    cpf: string | null;
    rg: string | null;
    cnpj: string | null;
    ie: string | null;
    email: string | null;
    phone: string | null;
    phone2: string | null;
    phone3: string | null;
    zipCode: string | null;
    uf: string | null;
    city: string | null;
    neighborhood: string | null;
    street: string | null;
    streetNumber: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export type OwnerPayload = Partial<Omit<Owner, "id" | "user_id" | "created_at" | "updated_at">>;

export interface OwnersPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface OwnersState {
    owners: Owner[];
    owner: Owner | null;
    pagination: OwnersPagination | null;
    loading: boolean;
    error: string | null;
}
