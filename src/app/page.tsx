'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { addNote, deleteNote, updateNote } from '../redux/notesSlice'
import { useState, useEffect } from 'react'
import { fetchNotesFromAPI } from '../redux/notesSlice'
import { useRouter } from 'next/navigation'
import Card from '@/component/Card'
import Modal from '@/component/Modal'

export default function Home() {


  const notes = useSelector((state: RootState) => state.notes.notes)
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const router = useRouter()


  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isViewMode, setIsViewMode] = useState(false)

  const openAddModal = () => {
    setTitle('')
    setDescription('')
    setEditingId(null)
    setIsViewMode(false)
    setShowModal(true)
  }

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      if (editingId) {
        dispatch(updateNote({ id: editingId, title, description }))
      } else {
        dispatch(addNote({ title, description }))
      }
      resetModal()
    }
  }

  const handleEdit = (note: { id: string; title: string; description: string }) => {
    setTitle(note.title)
    setDescription(note.description)
    setEditingId(note.id)
    setIsViewMode(false)
    setShowModal(true)
  }

  const handleView = (note: { title: string; description: string }) => {
    setTitle(note.title)
    setDescription(note.description)
    setEditingId(null)
    setIsViewMode(true)
    setShowModal(true)
  }

  const resetModal = () => {
    setTitle('')
    setDescription('')
    setEditingId(null)
    setIsViewMode(false)
    setShowModal(false)
  }

  useEffect(() => {
    dispatch(fetchNotesFromAPI())
  }, [dispatch])


  return (
    <>
      {isAuthenticated &&
        <>
          <div className="container">
            <h1 >Notes</h1>
            <button className="add-button" onClick={openAddModal}>➕ Add Note</button>

            <div className="grid">
              {notes.length === 0 && <p>Loading notes...</p>}
              {notes.map(note => (
                <React.Fragment key={note.id}>
                  <Card note={note} handleView={handleView} handleEdit={handleEdit} deleteNote={deleteNote} />
                </React.Fragment>
              ))}
            </div>

            <Modal showModal={showModal} isViewMode={isViewMode} editingId={editingId} title={title} description={description} setTitle={setTitle} setDescription={setDescription} handleSave={handleSave} resetModal={resetModal} />

          </div>

        </>
      }

    </>
  )
}
