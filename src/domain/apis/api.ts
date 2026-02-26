export interface API {
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
    path: string;
}
