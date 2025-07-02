import React, { useEffect } from 'react';
import useForm from '../../hook/useForm';
import DiscordService from '../../services/DiscordService';
import { useNavigate } from 'react-router-dom';
// import usernmae from './Dashboard';
// let username = "Stephen";
import msgContainerBackground from './MsgContainer.png';

export const initialFormState = {
  data: {
    name: 'anon',
    message: '',
  },
  error: {},
};

function Message() {
  const navigate = useNavigate();

  // useEffect hook to redirect to the dashboard if user is not named
  useEffect(() => {
    if (!sessionStorage.getItem('UserName')) {
      navigate('/dashboard');
    }
  });

  const { formData, setDynamicFormData, clearForm } = useForm(initialFormState);

  const { Send } = DiscordService(clearForm);

  const sendToDiscord = () => {
    const description = Object.entries(formData.data, '')
      .map((d) => `${d[0]} : ${d[1]}`)
      .join('\n');

    Send(description);
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{
        height: '100vh',
        minWidth: '20rem',
        position: 'absolute',
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center card p-4"
        style={{
          // backgroundImage: `url(${msgContainerBackground})`,
          backgroundColor: 'white',
          // backgroundSize: 'stretch',
          backgroundRepeat: 'no-repeat',
          // height: '20%',
        }}
      >
        <form className="d-flex flex-column">
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              id="msg-textarea"
              className="form-control form-control-sm"
              cols="40"
              rows="5"
              name="message"
              // value={formData.data.message}
              onChange={(e) => {
                const { name, value } = e.target;
                setDynamicFormData(name, value);
              }}
            ></textarea>
            {/* {formData.error.message ? (
                  <div className="alert alert-danger py-2">
                    {formData.error.message}
                  </div>
                ) : (
                  ""
                )} */}
          </div>
          <button
            className="btn btn-primary btn-sm"
            // disabled={!isValid}
            onClick={(e) => {
              e.preventDefault();
              console.log(
                sessionStorage.getItem('UserName') +
                  ' says: ' +
                  document.getElementById('msg-textarea').value
              );
              formData.data.name = sessionStorage.getItem('UserName');
              document.getElementById('msg-textarea').value = '';
              sendToDiscord();
            }}
            style={{ marginLeft: 'auto' }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
    // <div style={{ height: 100 + 'em' }} className="bg-light p-3 vh-100">
    //   <h1>Msger</h1>
    //   <div className="d-flex flex-column justify-content-center align-items-center">
    //     <div className="card p-3">
    //       <div
    //         id="dashboard-form"
    //         className="d-flex justify-content-center align-items-center"
    //       >
    //         <form className="">
    //           <div className="mb-3">
    //             <label className="form-label">Message</label>
    //             <textarea
    //               id="msg-textarea"
    //               className="form-control form-control-sm"
    //               cols="40"
    //               rows="5"
    //               name="message"
    //               // value={formData.data.message}
    //               onChange={(e) => {
    //                 const { name, value } = e.target;
    //                 setDynamicFormData(name, value);
    //               }}
    //             ></textarea>
    //             {/* {formData.error.message ? (
    //               <div className="alert alert-danger py-2">
    //                 {formData.error.message}
    //               </div>
    //             ) : (
    //               ""
    //             )} */}
    //           </div>
    //           <button
    //             className="btn btn-primary btn-sm"
    //             // disabled={!isValid}
    //             onClick={(e) => {
    //               e.preventDefault();
    //               console.log(
    //                 sessionStorage.getItem('UserName') +
    //                   ' says: ' +
    //                   document.getElementById('msg-textarea').value
    //               );
    //               formData.data.name = sessionStorage.getItem('UserName');
    //               document.getElementById('msg-textarea').value = '';
    //               sendToDiscord();
    //             }}
    //           >
    //             msg
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    //   <footer className="position-fixed w-100 text-center p-3 b-0">
    //     &copy; 2024 Cool Website. All rights reserved.
    //   </footer>
    // </div>
  );
}

export default Message;
