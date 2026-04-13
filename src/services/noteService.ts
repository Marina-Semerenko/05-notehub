import axios, {  type AxiosResponse } from "axios"
import type {  Note } from "../types/note";

export interface FetchNotesResponse {
    notes: Note[];
    totalCount: number;
    
}

export interface FetchNotesParams {
    title?: string;
    content?: string;
    tag?: string;
}
export const apiClient = axios.create({
    baseURL: "https://notehub-public.goit.study/api/",
});
apiClient.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

export const fetchNotes = async (page: number, search: string): Promise<FetchNotesResponse> => {
    const response: AxiosResponse<FetchNotesResponse> = await apiClient.get('/notes', {
       params: {
            page,
            perPage: 12,
            search,
        },
    });
    return response.data;
};


export const createNote = async (note: Note): Promise<Note> => {
    const response: AxiosResponse<Note> = await apiClient.post<Note>(`/notes/`, note);
    return response.data;         
 
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response: AxiosResponse<Note> = await apiClient.delete(`/notes/${id}`

    );
    return response.data;
};


