import React, { useState } from "react";
import axios from "axios";
import "./AddPatientModal.css";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const AddPatientModal = ({ closeModal }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(dayjs(new Date()));
  const [time, setTime] = useState(dayjs('2023-07-12T01:00'));
  const [status,setStatus]= useState("unsent");
  const [error, setError] = useState("");
  const whatChanged= "n/a";
  const [languageStr, setLanguageStr]= useState("english");
  const [language, setLanguage]= useState({
    English: false,
    Swahili: false,
  })

  const showDate= dayjs(appointmentDate).format();
  const showTime= time.format("HH:mm");


  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleChanges = () => {
    if(language.English == true){
      setLanguageStr("english");
    }
    if(language.Swahili == true){
      setLanguageStr("swahili");
    }
  };

  const handleChangeLanguage = (event) => {
    const { name, checked } = event.target;
    setLanguage((prevLanguage) => ({
      ...prevLanguage,
      [name]: checked,
    }));
    if(language.English == true){
      setLanguageStr("english");
    }
    if(language.Swahili == true){
      setLanguageStr("swahili");
    }
  };

  const handleSubmit = () => {
    if(phoneNumber == "" || appointmentDate == "" || showTime == ""){
        setError("Please Provide A Valid Phone Number, Appointment Date and Time")
    } else {
        axios.post("https://imara-health-backend-v2.onrender.com/add-user", {phoneNumber,appointmentDate,showTime,status,whatChanged,languageStr})
        .then(response => {
            if(response.status == 500 || response.data.message == "Phone Number Already Registered"){
                setError(response.data.message);
            } else {
                setError("")
                closeModal();
            }
        })
        .catch(err => {
            setError(err);
        })
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>Add Patient</h2>
        <button onClick={closeModal} className="modal-close-btn">
          &times;
        </button>
      </div>
      <div className="modal-body">
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
            />
          </div>
          <div className="appointment-date-calendar">
            <label htmlFor="appointmentDate">Appointment Date:</label>
          </div>
          <div style={{margin: "1%"}}  >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                label="Select Date"
                type="text"
                id="appointmentDate"
                value={appointmentDate}
                onChange={setAppointmentDate}
              />
              <div className="appointment-date-time">
                <label htmlFor="time">Appointment Time:</label>
              </div>
              <DesktopTimePicker
                label="Select Time"
                id="time"
                value={time}
                onChange={setTime}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="displayUpdates">
          <p>Selected Appointment: {showDate.substring(0,10)} at {showTime}</p>
        </div>
        <p className="medicineHeader">Language Selected : {languageStr}</p>
        <div className="form-group">
            <div className="days-container">
            <div>
                <label htmlFor="English">English</label>
                <input
                type="checkbox"
                id="English"
                name="English"
                checked={language.English}
                onChange={handleChangeLanguage}
                />
            </div>
            <div>
                <label htmlFor="Swahili">Swahili</label>
                <input
                type="checkbox"
                id="Swahili"
                name="Swahili"
                checked={language.Swahili}
                onChange={handleChangeLanguage}
                />
            </div>
            </div>
        </div>
        <div className="buttonList">
            <button onClick={handleChanges}>Save Language</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="errorTag">{error}</div>
      </div>
    </div>
  );
}

export default AddPatientModal;