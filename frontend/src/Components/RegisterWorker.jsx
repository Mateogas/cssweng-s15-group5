import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSDWs } from '../fetch-connections/case-connection';
import SimpleModal from './SimpleModal';
import { createAccount } from '../fetch-connections/account-connection';

export default function RegisterWorker({
  isOpen,
  onClose,
  onRegister,
  projectLocations = [],
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalImageCenter, setModalImageCenter] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalOnConfirm, setModalOnConfirm] = useState(() => { });

  const [formData, setFormData] = useState({
    sdw_id: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    contact_no: '',
    spu_id: '',
    role: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    manager: ""
  });

  const [socialDevelopmentWorkers, setSocialDevelopmentWorkers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        sdw_id: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        contact_no: '',
        spu_id: '',
        role: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        manager: '',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const loadSDWs = async () => {
      const sdws = await fetchSDWs();
      setSocialDevelopmentWorkers(sdws);
    };
    loadSDWs();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const isValid = await checkRegisterWorker();
    if (!isValid) return;

    const payload = {
      ...formData,
      manager: (formData.role !== "sdw" || formData.manager?.trim() === "")
        ? null
        : formData.manager
    };

    const res = await createAccount(payload);

    if (res.ok) {
      setModalTitle("Success");
      setModalBody(res.data.message || "Account created successfully.");
      setModalImageCenter(<div className="success-icon mx-auto"></div>);
      setModalConfirm(false);
      setShowModal(true);

      setModalOnConfirm(() => () => {
        onRegister?.(formData);
        onClose?.();
        setShowModal(false);
      });

    } else {
      setModalTitle("Error");
      setModalBody(res.data.message || "Failed to create account.");
      setModalImageCenter(<div className="warning-icon mx-auto"></div>);
      setModalConfirm(false);
      setShowModal(true);
    }

  };

  useEffect(() => {
    const filtered = socialDevelopmentWorkers.filter(
      (w) => w.spu_id === formData.spu_id && w.role === 'super'
    );
    setSupervisors(filtered);
  }, [formData.spu_id, socialDevelopmentWorkers]);

  const checkRegisterWorker = async () => {
    const missing = [];

    if (!formData.first_name || /\d/.test(formData.first_name)) missing.push("First Name");
    // if (!formData.middle_name || /\d/.test(formData.middle_name)) missing.push("Middle Name");
    if (!formData.last_name || /\d/.test(formData.last_name)) missing.push("Last Name");
    if (!formData.username) missing.push("Username");
    if (!formData.sdw_id || formData.sdw_id.trim() === "") {
      missing.push("SDW ID");
    } else if (isNaN(Number(formData.sdw_id))) {
      missing.push("SDW ID must be numeric");
    } else if (Number(formData.sdw_id) <= 0) {
      missing.push("SDW ID must be greater than zero");
    }
    if (!formData.role) missing.push("Role");
    if (!formData.spu_id) missing.push("SPU");
    if (!formData.password || formData.password.length < 8) missing.push("Password (min 8 chars)");

    if (!formData.confirmPassword) {
      missing.push("Confirm Password");
    } else if (formData.password !== formData.confirmPassword) {
      missing.push("Passwords do not match");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) missing.push("Valid Email");
    if (!formData.contact_no || formData.contact_no.length !== 11) missing.push("Contact No. (11 digits)");

    if (missing.length > 0) {
      setModalTitle("Invalid Fields");
      setModalBody(`The following fields are missing or invalid: ${missing.join(", ")}`);
      setModalImageCenter(<div className="warning-icon mx-auto"></div>);
      setModalConfirm(false);
      setShowModal(true);
      return false;
    }
    return true;
  };

  const handleModalClose = () => {
    if (modalOnConfirm) {
      modalOnConfirm();
    }
    setShowModal(false);
    setModalTitle("");
    setModalBody("");
    setModalImageCenter(null);
    setModalConfirm(false);
    setModalOnConfirm(() => { });
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
        onConfirm={() => {
          modalOnConfirm?.();
        }}
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

            <div className="relative bg-white rounded-lg drop-shadow-card max-w-[60rem] w-full min-h-[40rem] z-10 overflow-hidden flex flex-col">
              <div className="w-full p-5 drop-shadow-base bg-gray-100">
                <h2 className="header-sub text-xl font-bold">Register New Worker</h2>
              </div>

              <div className="flex flex-col gap-5 flex-1 p-10">

                <div className='flex gap-3'>
                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-bold-label">First Name</p>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="text-input font-label"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-bold-label">Middle Name</p>
                    <input
                      type="text"
                      name="middle_name"
                      placeholder="Middle Name"
                      value={formData.middle_name}
                      onChange={handleChange}
                      className="text-input font-label"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-bold-label">Last Name</p>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="text-input font-label"
                    />
                  </div>
                </div>

                <div className='flex gap-3'>
                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-bold-label">Username</p>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      className="text-input font-label"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-bold-label">SDW ID</p>
                    <input
                      type="text"
                      name="sdw_id"
                      placeholder="SDW ID"
                      value={formData.sdw_id}
                      onChange={handleChange}
                      className="text-input font-label"
                    />
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
                      <option value="head">Head</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold-label">Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-input font-label"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold-label">Confirm Password</p>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
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
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-input font-label"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-bold-label">Contact Number</p>
                    <input
                      type="text"
                      name="contact_no"
                      placeholder="Contact Number"
                      value={formData.contact_no}
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

                  {(formData.role == "" || formData.role == "sdw") && <div className="flex flex-col gap-2 w-full">
                    <p className="font-bold-label">Supervisor</p>
                    <select
                      name="manager"
                      value={formData.manager}
                      onChange={handleChange}
                      className="text-input font-label"
                    >
                      <option value="">Select Supervisor</option>
                      {supervisors.map((supervisor) => (
                        <option key={supervisor.id} value={supervisor.id}>
                          {supervisor.username} ({supervisor.id})
                        </option>
                      ))}
                    </select>
                  </div>}
                </div>

                <div className="flex justify-end gap-4 mt-8">
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
