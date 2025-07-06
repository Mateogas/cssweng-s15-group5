import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterWorker({
  isOpen,
  onClose,
  onRegister,
  projectLocations = [],
}) {
  const [formData, setFormData] = useState({
    sdw_id: '',
    username: '',
    password: '',
    email: '',
    contact_number: '',
    spu_id: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onRegister?.(formData);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-99"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

          <div className="relative bg-white rounded-lg drop-shadow-card max-w-[60rem] w-full min-h-[40rem] z-10 overflow-hidden flex flex-col">
            <div className="w-full p-5 drop-shadow-base bg-gray-100">
              <h2 className="header-sub text-xl font-bold">Register New Worker</h2>
            </div>

            <div className="flex flex-col gap-5 flex-1 p-10">
              <div className="flex flex-col gap-2">
                <p className="font-bold-label">SDW ID</p>
                <input
                  type="text"
                  name="sdw_id"
                  value={formData.sdw_id}
                  onChange={handleChange}
                  className="text-input font-label"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-bold-label">Username</p>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="text-input font-label"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-bold-label">Password</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-input font-label"
                />
              </div>

              <div className='flex gap-3'>
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-bold-label">Email</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-input font-label"
                  />
                </div>

                <div className="flex flex-col gap-2  w-full">
                  <p className="font-bold-label">Contact Number</p>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="text-input font-label"
                  />
                </div>
              </div>

              <div className='flex gap-3'>
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-bold-label">SPU</p>
                  <select
                    name="spu_id"
                    value={formData.spu_id}
                    onChange={handleChange}
                    className="text-input font-label"
                  >
                    <option value="">Select SPU</option>
                    {projectLocations.map((spu) => (
                      <option key={spu.projectCode} value={spu.projectCode}>
                        {spu.name} ({spu.projectCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <p className="font-bold-label">Role</p>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="text-input font-label"
                  >
                    <option value="">Select Role</option>
                    <option value="sdw">Social Development Worker</option>
                    <option value="super">Supervisor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  className="btn-outline font-bold-label"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary font-bold-label"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
