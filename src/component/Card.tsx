import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux'

type Note = {
    id: string;
    title: string;
    description: string;
};

type CardProps = {
    note: Note;
    handleView: (note: Note) => void;
    handleEdit: (note: Note) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteNote: (id: string) => any; 
};

function Card({ note, handleView, handleEdit, deleteNote }: CardProps) {
    const dispatch = useDispatch()
    return (
        <motion.div className="card box-shadow" initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{
                scale: 1.03,
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
            }}>
            <h3 className='title-ellipsis'>{note.title}</h3>
            <p className='para-ellipsis'>{note.description}</p>
            <div className="card-buttons">
                <button onClick={() => handleView(note)}>👁️ View</button>
                <button onClick={() => handleEdit(note)}>✏️ Update</button>
                <button onClick={() => dispatch(deleteNote(note.id))}>🗑️ Delete</button>
            </div>
        </motion.div>
    )
}

export default Card