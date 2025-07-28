import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleModal from './SimpleModal';
import { createSpu } from '../fetch-connections/spu-connection';

export default function RegisterSpu({ isOpen, onClose, existingSpus = [], onRegister }) {
  const [spuName, setSpuName] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalImageCenter, setModalImageCenter] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalOnConfirm, setModalOnConfirm] = useState(() => { });

  useEffect(() => {
    if (!isOpen) {
      setSpuName("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const trimmedName = spuName.trim();
    if (!trimmedName) {
      triggerModal("Missing Field", "SPU name is required.");
      return;
    }

    const exists = existingSpus.some(spu => spu.spu_name.toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
      triggerModal("Duplicate", `The SPU name "${trimmedName}" already exists.`);
      return;
    }

    const result = await createSpu(trimmedName);
    if (result) {
      triggerModal("Success", "SPU created successfully.", <div className="success-icon mx-auto"></div>, () => {
        onRegister?.(result);
        onClose?.();
        setShowModal(false);
      });
    } else {
      triggerModal("Error", "Failed to create SPU.", <div className="warning-icon mx-auto"></div>);
    }
  };

  const triggerModal = (title, body, icon = <div className="warning-icon mx-auto"></div>, onConfirm = null) => {
    setModalTitle(title);
    setModalBody(body);
    setModalImageCenter(icon);
    setModalConfirm(false);
    setShowModal(true);
    setModalOnConfirm(() => onConfirm || (() => setShowModal(false)));
  };

  const handleModalClose = () => {
    modalOnConfirm?.();
    setShowModal(false);
  };

  return (
    <>
      <SimpleModal
        isOpen={showModal}
        onClose={handleModalClose}
        title={modalTitle}
        bodyText={modalBody}
        imageCenter={modalImageCenter}
        confirm={modalConfirm}
        onConfirm={handleModalClose}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

            <div className="relative bg-white rounded-lg drop-shadow-card max-w-md w-full p-10 z-10">
              <h2 className="header-sub text-xl font-bold mb-6">Register New SPU</h2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-bold-label">SPU Name</p>
                  <input
                    type="text"
                    name="spuName"
                    placeholder="Enter SPU name"
                    value={spuName}
                    onChange={(e) => setSpuName(e.target.value)}
                    className="text-input font-label"
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button className="btn-outline font-bold-label" onClick={onClose}>
                    Cancel
                  </button>
                  <button className="btn-primary font-bold-label" onClick={handleSubmit}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}