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
    // Asistencias a 6 clases
    c1?: boolean;
    c2?: boolean;
    c3?: boolean;
    c4?: boolean;
    c5?: boolean;
    c6?: boolean;
}
