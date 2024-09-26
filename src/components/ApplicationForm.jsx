import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropZone from './DropZone';
import '../styles/ApplicationForm.css';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    contact: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    presentAddress: '',
    emailAddress: '',
    nationality: '',
    aadhaarNumber: '',
    Aadhaar: null,
    passportPhoto: null,
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    PANNumber: '',
    PAN: null,
    citizenshipAcquiredBy: '',
    foreignPassport: '',
    placeofbirth:'',
    occupation:''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (name, file) => {
    setFormData((prevData)=>({
      ...prevData,
      [name]: file
    }));
  };

  const handleRemoveFile = (name) => {
    setFormData((prevData)=>{
      const newData={...prevData};
      delete newData[name];
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      navigate('/review', { state: { formData } });
  };

  return (
    <div className="formContainer">  
      <form onSubmit={handleSubmit}>
        <div className="banner">
          <h2>Passport Application Form</h2>
        </div>
        <div className="row">
          <div className="formGroup">
            <label>First Name<span class="required">*</span></label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} placeholder='First' required />
          </div>
          <div className="formGroup">
            <label>Last Name<span class="required">*</span></label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder='Last' required />
          </div>
        </div>
        <div className="row">
          <div className="formGroup">
            <label>Contact<span class="required">*</span></label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label>Date of Birth<span class="required">*</span></label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="formGroup">
            <label>Gender<span class="required">*</span></label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="formGroup">
            <label>Nationality<span class="required">*</span></label>
            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
        <div className="formGroup">
            <label>Present Address<span class="required">*</span></label>
            <textarea name="presentAddress" value={formData.presentAddress} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label>Permanent Address<span class="required">*</span></label>
            <textarea name="address" value={formData.address} onChange={handleChange} required />
          </div>
        </div>
        <div className="row"> 
          <div className="formGroup">
            <label>Email Address<span class="required">*</span></label>
            <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label>Aadhaar Number<span class="required">*</span></label>
            <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} required />
          </div>
        </div>
        <DropZone name="Aadhaar" label="Upload Aadhaar" 
        formData={formData}
        handleFileChange={handleFileChange}
        handleRemoveFile={handleRemoveFile}
        />
        <div className="row">
          <div className="formGroup">
            <label>Father's Name<span class="required">*</span></label>
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label>Mother's Name<span class="required">*</span></label>
            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="formGroup">
            <label>Place of Birth<span class="required">*</span></label>
            <input type="text" name="placeofbirth" value={formData.placeofbirth} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label>Occupation<span class="required">*</span></label>
            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="formGroup">
            <label>Marital Status<span class="required">*</span></label>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div className="formGroup">
            <label>PAN Number<span class="required">*</span></label>
            <input type="text" name="PANNumber" value={formData.PANNumber} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="formGroup">
            <label>Citizenship Acquired By<span className="required">*</span></label>
            <select name="citizenshipAcquiredBy" value={formData.citizenshipAcquiredBy} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Birth">Birth</option>
              <option value="Election">Election</option>
              <option value="Marriage">Marriage</option>
              <option value="Naturalization">Naturalization</option>
              <option value="R.A. 9225">R.A. 9225</option>
            </select>
          </div>
          <div className="formGroup">
            <label>Are you a holder of a foreign passport?<span className="required">*</span></label>
            <div className="questionAnswer">
              <div>
                <input type="radio" value="Yes" id="foreign_passport_yes" name="foreignPassport" checked={formData.foreignPassport === 'Yes'} onChange={handleChange} required />
                <label htmlFor="foreign_passport_yes" className="radio"><span>Yes</span></label>
              </div>
              <div>
                <input type="radio" value="No" id="foreign_passport_no" name="foreignPassport" checked={formData.foreignPassport === 'No'} onChange={handleChange} required />
                <label htmlFor="foreign_passport_no" className="radio"><span>No</span></label>
              </div>
            </div>
          </div>
        </div>
        <DropZone name="PAN" label="Upload PAN" 
        formData={formData}
        handleFileChange={handleFileChange}
        handleRemoveFile={handleRemoveFile}
        />
        <DropZone name="passportPhoto" label="Passport Photo" 
        formData={formData}
        handleFileChange={handleFileChange}
        handleRemoveFile={handleRemoveFile}
        />
        
        <button type="submit" className="submitButton">Save and Continue</button>
      </form>
    </div>
  );
};

export default ApplicationForm;