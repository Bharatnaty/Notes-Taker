import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


type Note = {
  id: string
  title: string
  description: string
}

type NotesState = {
  notes: Note[]
  loading: boolean
}

const initialState: NotesState = {
  notes: [],
  loading: false,
}

type NoteItem = {
  id: string
  title: string
  body: string
}


// 🔄 Thunk to fetch data from public API
export const fetchNotesFromAPI = createAsyncThunk('notes/fetchFromAPI', async () => {
 const response = await axios.get<NoteItem[]>( `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, {
    params: { _limit: 3 },
  });
  return response.data.map((item: NoteItem) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.body,
  }))
})

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newNote = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
      }
      state.notes.push(newNote)
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
    updateNote: (state, action: PayloadAction<{ id: string; title: string; description: string }>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          title: action.payload.title,
          description: action.payload.description,
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotesFromAPI.pending, state => {
        state.loading = true
      })
      .addCase(fetchNotesFromAPI.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.notes = action.payload
        state.loading = false
      })
      .addCase(fetchNotesFromAPI.rejected, state => {
        state.loading = false
      })
  },
})

export const { addNote, deleteNote, updateNote } = notesSlice.actions
export default notesSlice.reducer
