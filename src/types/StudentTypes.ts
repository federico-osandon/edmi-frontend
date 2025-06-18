export interface Student {
    _id: string;
    first_name: string;
    last_name?: string;
    email?: string;
    is_active?: boolean;
    role?: string;
    enrollment?: boolean;
    activity?: string;
    is_beca?: boolean;
}
