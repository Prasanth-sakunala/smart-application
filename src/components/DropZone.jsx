import React from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/ApplicationForm.css';

const DropZone = ({ name, label, formData, handleFileChange, handleRemoveFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileChange(name, acceptedFiles[0]);
    }
  });

  return (
    <div className="formGroup">
      <label>{label}:</label>
      {formData[name] ? (
        <div className="filePreview">
          <p>{formData[name].name}</p>
          <button type="button" onClick={() => handleRemoveFile(name)}>Remove</button>
        </div>
      ) : (
        <div {...getRootProps({ className:"dropzone"})}>
          <input {...getInputProps()} />
          <p>Drag & drop a file here, or click to select a file</p>
        </div>
      )}
    </div>
  );
};

export default DropZone;