import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import DropZone from './DropZone';
import '../styles/Review.css'; 

const Review = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { formData } = state;

  const [signature, setSignature] = useState(null);
  const sigCanvas = useRef(null);

  const handleSignatureUpload = (name, file) => {
    setSignature(file);
  };

  const handleRemoveSignature = (name) => {
    setSignature(null);
  };

  const handleClearSignature = () => {
    setSignature(null);
  };

  const handleSaveSignature = () => {
    if (sigCanvas.current) {
      setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    }
  };

  const handleSubmit = () => {
    navigate('/download', { state: { formData, signature } });
  };

  return (
    <div className="reviewContainer">
      <h1>Review Your Details</h1>
      <div id="pdf-content">
        <div className="reviewGroup">
          <label>First Name:</label>
          <p>{formData.firstname}</p>
        </div>
        <div className="reviewGroup">
          <label>Last Name:</label>
          <p>{formData.lastname}</p>
        </div>
        <div className="reviewGroup">
          <label>Contact:</label>
          <p>{formData.contact}</p>
        </div>
        <div className="reviewGroup">
          <label>Date of Birth:</label>
          <p>{formData.dateOfBirth}</p>
        </div>
        <div className="reviewGroup">
          <label>Gender:</label>
          <p>{formData.gender}</p>
        </div>
        <div className="reviewGroup">
          <label>Address:</label>
          <p>{formData.address}</p>
        </div>
        <div className="reviewGroup">
          <label>Present Address:</label>
          <p>{formData.presentAddress}</p>
        </div>
        <div className="reviewGroup">
          <label>Email Address:</label>
          <p>{formData.emailAddress}</p>
        </div>
        <div className="reviewGroup">
          <label>Nationality:</label>
          <p>{formData.nationality}</p>
        </div>
        <div className="reviewGroup">
          <label>Aadhaar Number:</label>
          <p>{formData.aadhaarNumber}</p>
        </div>
        <div className="reviewGroup">
          <label>Father's Name:</label>
          <p>{formData.fatherName}</p>
        </div>
        <div className="reviewGroup">
          <label>Mother's Name:</label>
          <p>{formData.motherName}</p>
        </div>
        <div className="reviewGroup">
          <label>Marital Status:</label>
          <p>{formData.maritalStatus}</p>
        </div>
        <div className="reviewGroup">
          <label>PAN Number:</label>
          <p>{formData.PANNumber}</p>
        </div>
        <div className="reviewGroup">
          <label>Citizenship Acquired By:</label>
          <p>{formData.citizenshipAcquiredBy}</p>
        </div>
        <div className="reviewGroup">
          <label>Are you a holder of a foreign passport?</label>
          <p>{formData.foreignPassport}</p>
        </div>
        <div className="reviewGroup">
          <label>Place of Birth:</label>
          <p>{formData.placeofbirth}</p>
        </div>
        <div className="reviewGroup">
          <label>Occupation:</label>
          <p>{formData.occupation}</p>
        </div>
        <div className="reviewGroup">
          <label>PAN:</label>
          {formData.PAN && (
            <img
              src={URL.createObjectURL(formData.PAN)}
              alt="PAN"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        <div className="reviewGroup">
          <label>Aadhaar:</label>
          {formData.Aadhaar && (
            <img
              src={URL.createObjectURL(formData.Aadhaar)}
              alt="Aadhaar"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        <div className="reviewGroup">
          <label>Passport Photo:</label>
          {formData.passportPhoto && (
            <img
              src={URL.createObjectURL(formData.passportPhoto)}
              alt="Passport"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        <div className="reviewGroup">
          <label>Digital Signature:</label>
          {signature ? (
            <div className="signature">
              <img
                src={typeof signature === 'string' ? signature : URL.createObjectURL(signature)}
                alt="Signature"
                style={{ width: '200px', height: '100px' }}
              />
              <button type="button" onClick={handleClearSignature}>Clear Signature</button>
            </div>
          ) : (
            <div>
              <DropZone
                name="signature"
                label="Upload Signature"
                formData={{ signature }}
                handleFileChange={handleSignatureUpload}
                handleRemoveFile={handleRemoveSignature}
              />
              <p>Make your own Signature here.</p>
              <SignatureCanvas
                penColor="black"
                canvasProps={{ width: 500, height: 200, className:"sigCanvas" }}
                ref={sigCanvas}
              />
              <button type="button" onClick={handleSaveSignature}>Save Signature</button>
            </div>
          )}
        </div>
      </div>
      <button type="button" onClick={handleSubmit} className="submitButton">Submit</button>
    </div>
  );
};

export default Review;