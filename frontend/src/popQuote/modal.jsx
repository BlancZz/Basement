import { AnimatePresence, motion } from 'framer-motion';
import { PiLightbulb } from 'react-icons/pi';
import { useState } from 'react';

import useForm from '../hook/useForm';
import DiscordService from '../services/DiscordService';

export const initialFormState = {
  data: {
    name: 'anon',
    message: '',
  },
  error: {},
};

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div /* className="px-4 py-64 bg-slate-900 grid place-content-center"*/>
      {/* <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-medium px-4 py-2 rounded opacity-80 hover:opacity-100 transition-opacity"
      >
        Add Quote :3
      </button> */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-0.5 border-2 border-black dark:border-white uppercase bg-white 
        text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)]
        dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]
        transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[0px_0px_0px]"
      >
        Add Quote :3
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen }) => {
  const { formData, setDynamicFormData, clearForm } = useForm(initialFormState);

  const { Send } = DiscordService(clearForm);

  const sendToDiscord = () => {
    if (formData.data.message === '') {
      return;
    }
    const description = Object.entries(formData.data, '')
      .map((d) => `${d[0]} : ${d[1]}`)
      .join('\n');

    Send(description);
  };

  const [name, setName] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <PiLightbulb className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <PiLightbulb />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Contribute Quote!
              </h3>
              <p className="text-center mb-3">
                Sends to my Discord for review. Feel free to leave your name or
                some form of contact :D
              </p>
              <form className="d-flex flex-column">
                <div className="mb-3">
                  <label className="form-label">Name/Email</label>
                  <textarea
                    id="msg-name"
                    className="form-control form-control-sm"
                    placeholder="(optional)"
                    cols="40"
                    rows="1"
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    required
                    id="msg-textarea"
                    className="form-control form-control-sm"
                    placeholder="Roses are red, Violets are grey, have you had your inner health plus today?"
                    cols="40"
                    rows="3"
                    name="message"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setDynamicFormData(name, value);
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Nah, go back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.data.message.trim() !== '') {
                        setIsOpen(false);
                        formData.data.name = name;
                        sendToDiscord();
                        localStorage.setItem(
                          'name',
                          name !== '' ? name : 'null'
                        );
                      }
                    }}
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                  >
                    Send!
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
