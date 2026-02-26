import { StickyNote } from '../models/StickyNote.model';
import { API } from './api';

export namespace GetStickyNotes {
  export const api: API = {
    method: 'GET',
    path: '/v1/sticky-note/list'
  };

  export type ResponseDTO = {
    stickyNotes: Array<StickyNote>
  };
}

export namespace UpdateStickyNote {
  export const api: API = {
    method: 'PATCH',
    path: '/v1/sticky-note'
  };

  export type QueryDTO = {
    id: string;
  };

  export type ResponseDTO = {}

  export type RequestDTO = Partial<Omit<StickyNote, 'id'>>
}

export namespace CreateStickyNote {
  export const api: API = {
    method: 'POST',
    path: '/v1/sticky-note'
  };

  export type ResponseDTO = StickyNote

  export type RequestDTO = Omit<StickyNote, 'id'>
}
