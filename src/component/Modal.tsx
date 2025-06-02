import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
  showModal: boolean;
  isViewMode: boolean;
  editingId: string | null;
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  handleSave: () => void;
  resetModal: () => void;
};


function Modal({showModal,isViewMode,editingId,title,description,setTitle,setDescription,handleSave,resetModal}: ModalProps) {
  return (
     <AnimatePresence>
                  {showModal && (
                    <motion.div className="modal-overlay" initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <motion.div className="modal box-shadow" initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.25 }}>
                        <h2>{isViewMode ? 'View Note' : editingId ? 'Update Note' : 'Add Note'}</h2>
    
                        {isViewMode ? (
                          <>
                            <p><strong>Title:</strong> {title}</p>
                            <p><strong>Description:</strong></p>
                            <p>{description}</p>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              placeholder="Title"
                              value={title}
                              onChange={e => setTitle(e.target.value)}
                            />
                            <textarea
                              placeholder="Description"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              rows={4}
                            />
                          </>
                        )}
    
                        <div className="modal-buttons">
                          {!isViewMode && <button onClick={handleSave}>{editingId ? 'Update' : 'Save'}</button>}
                          <button onClick={resetModal} className="cancel">Close</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
  )
}

export default Modal