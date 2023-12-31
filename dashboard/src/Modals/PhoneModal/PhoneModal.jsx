import React , { useState } from "react";
import axios from "axios";

const PhoneModal = ({closeModal, user}) => {
    const oldNum = user.phoneNumber;
    const [error,setError] = useState("");
    const status = "unsent";
    const whatChanged= "phoneNumber";
    const [phoneNumberNow,setPhoneNumber] = useState(user.phoneNumber);
    const handleChangePhoneNumber = () => {
        axios.post("https://imara-health-backend-v2.onrender.com/edit-phono", {newPhoneNum : phoneNumberNow , oldNum : oldNum, status, whatChanged})
        .then(response => {
            if(response.data.message == "Phone Number Updated"){
                setError("");
                closeModal();
            } else {
                setError(response.data.message);
            }
        })
        .catch(err => {
            setError(err);
        })
    }
    return (
        <div className="modal-container">
            <div className="modal-header">
                <h2>Change Phone Number</h2>
                <button onClick={closeModal} className="modal-close-btn">
                    &times;
                </button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumberNow}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="deleteButtonsPhone">
                    <button className="dangerPhone" onClick={() => handleChangePhoneNumber()}>Change Phone Number</button>
                </div>
                <div className="errorTag">{error}</div>
            </div>
        </div>
    );
}

export default  PhoneModal;