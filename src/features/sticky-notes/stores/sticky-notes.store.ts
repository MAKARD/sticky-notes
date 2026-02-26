import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';

import { CreateStickyNote, GetStickyNotes, UpdateStickyNote } from '@/domain/apis/sticky-notes.api';
import { APIService } from '@/infrastructure/services/HTTPService';
import { StickyNote } from '@/domain/models/StickyNote.model';

const getNotes = APIService
  .createRequest<GetStickyNotes.ResponseDTO, {}, {}>(GetStickyNotes.api);

const updateNote = APIService
  .createRequest<UpdateStickyNote.ResponseDTO, UpdateStickyNote.RequestDTO, UpdateStickyNote.QueryDTO>(UpdateStickyNote.api);

const createNote = APIService
  .createRequest<CreateStickyNote.ResponseDTO, CreateStickyNote.RequestDTO, {}>(CreateStickyNote.api);

interface StickyNotesStore {
  items: Array<StickyNote>
  fetchNotes(): Promise<void>;
  changeNoteById(id: string, payload: Partial<Omit<StickyNote, 'id'>>): Promise<void>
  createNote(payload: Omit<StickyNote, 'id'>): Promise<void>
}

export const useStickyNotes = create<StickyNotesStore>()(
  persist(
    immer((set, getState) => ({
      items: [],
      createNote: async (payload) => {
        const tempId = `tmp_id_${Date.now().toString()}`

        set((state) => ({
          ...state,
          items: [
            ...state.items,
            {
              ...payload,
              id: tempId
            }
          ]
        }))

        try {
          const serverNote = await createNote({
            body: payload
          })

          set((state) => ({
            ...state,
            items: state.items.map((item) => {
              if (item.id !== tempId) return item

              return {
                ...item,
                ...serverNote
              }
            })
          }))
        } catch (error) {
          set((state) => ({
            ...state,
            items: state.items.filter((item) => {
              return item.id !== tempId
            })
          }))
          console.log(error)
        }
      },
      changeNoteById: async (id, payload) => {
        const note = getState().items.find((item) => item.id === id)

        try {
          if (!note) throw new Error(`No note with id ${id} is given`)

          set((state) => ({
            ...state,
            items: state.items.map((item) => {
              if (item.id !== id) return item

              return {
                ...item,
                ...payload
              }
            })
          }))

          await updateNote({
            body: payload,
            queryParams: {
              id
            }
          })
        } catch (error) {
          set((state) => ({
            ...state,
            items: state.items.map((item) => {
              if (item.id !== id) return item

              return {
                ...item,
                ...note
              }
            })
          }))

          console.error(error)
        }
      },
      fetchNotes: async () => {
        const { stickyNotes } = await getNotes({});

        console.log("stickyNotes", stickyNotes)

        set({
          items: stickyNotes
        });
      },
    })),
    {
      name: 'sticky_notes',
      storage: createJSONStorage(() => localStorage)
    }
  ));

