import React, { useRef} from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import '../styles/DownloadPage.css';

const DownloadPage = () => {
  const { state } = useLocation();
  const { formData, signature } = state;
  const pdfRef = useRef();

  const generatePDF = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
    const margin = 20;
    const imageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
    const imageHeight = imageWidth * 0.75; // Assuming a 4:3 aspect ratio for the images
  
    const addImageToPDF = async (file, label) => {
      pdf.addPage();
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (e) => {
          pdf.text(label, margin, margin);
          pdf.addImage(e.target.result, 'PNG', margin, margin + 10, imageWidth, imageHeight);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    };
  
    if (formData.Aadhaar) {
      await addImageToPDF(formData.Aadhaar, 'Aadhaar Image:');
    }
  
    if (formData.passportPhoto) {
      await addImageToPDF(formData.passportPhoto, 'Passport Photo:');
    }
  
    if (formData.PAN) {
      await addImageToPDF(formData.PAN, 'PAN Image:');
    }
  
    pdf.save('application_form.pdf');
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([formData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'form_data.xlsx');
  };

  return (
    <div className="download-container">
      <div ref={pdfRef} className="pdf-container">
        <div className="pdf-header">
          <h3>Republic of the India</h3>
          <h1>DEPARTMENT OF FOREIGN AFFAIRS</h1>
          <h3>PASSPORT APPLICATION FORM</h3>
        </div>
        <p className="pdf-note">
          THIS APPLICATION FORM IS NOT FOR SALE. PLEASE DO NOT LEAVE ANY SPACES BLANK, INDICATE N/A IF NOT APPLICABLE. PROVIDING FALSE STATEMENTS IN PASSPORT APPLICATIONS IS PUNISHABLE BY LAW (R.A. 8239).
        </p>
        <table className="pdf-table">
          <tbody>
            <tr>
              <td>
                <label>FIRST NAME:</label>
                <p>{formData.firstname}</p>
              </td>
              <td>
                <label>LAST NAME:</label>
                <p>{formData.lastname}</p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Contact No:</label>
                <p>{formData.contact}</p>
              </td>
              <td>
                <label>PLACE OF BIRTH:</label>
                <p>{formData.placeofbirth}</p>
              </td>
            </tr>
            <tr>
              <td>
                <label>DATE OF BIRTH:</label>
                <p>{formData.dateOfBirth}</p>
              </td>
              <td>
                <label>GENDER:</label>
                <p>{formData.gender}</p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Father Name:</label>
                <p>{formData.fatherName}</p>
              </td>
              <td>
                <label>Mother Name:</label>
                <p>{formData.motherName}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-section">
          <div className="section-title">Civil Status:</div>
          <p>{formData.maritalStatus}</p>
        </div>
        <table className="pdf-table">
          <tbody>
            <tr>
              <td>
                <label>Present Address:</label>
                <p>{formData.presentAddress}</p>
              </td>
              <td>
                <label>Occupation:</label>
                <p>{formData.occupation}</p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Permanent Address:</label>
                <p>{formData.address}</p>
              </td>
              <td>
                <label>E-mail Address:</label>
                <p>{formData.emailAddress}</p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Aadhaar Number :</label>
                <p>{formData.aadhaarNumber}</p>
              </td>
              <td>
                <label>PAN Number :</label>
                <p>{formData.PANNumber}</p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Nationality :</label>
                <p>{formData.nationality}</p>
              </td>
              <td>
                <label>Citizenship acquired by</label>
                <p>{formData.citizenshipAcquiredBy}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-section">
          <div className="section-title">Are you a holder of foreign passport?:</div>
          <p>{formData.foreignPassport}</p>
        </div>
        <div className="signature-section">
          <p>I SOLEMNLY SWEAR that 1) I am a Indian citizen. 2) The information I provided in this application are true and correct. 3) The supporting documents attached are authentic. 4) I am aware that under the law, I am allowed to hold only one Philippine passport at any given time. 5) I am aware that making false statements in passport applications, furnishing falsified or forged documents in support thereof are punishable by law.</p>
        </div>
        <div className="signature-box">
          {signature && <img src={signature} alt="Signature" />}
          <p>Signature of Applicant or Legal Guardian (for minor applicants)</p>
        </div>
        <div className="remarks-section">
          <div className="dashed">
            <p>FOR USE OF THE DEPARTMENT OF FOREIGN AFFAIRS ONLY. PLEASE DO NOT WRITE BELOW THIS LINE.</p>
          </div>
        </div>
      </div>
      <div className="download-buttons">
        <h1>Download Your Application</h1>
        <p>Click the buttons below to download your application in PDF or Excel format.</p>
        <button type="button" onClick={generatePDF} className="download-button">Download as PDF</button>
        <button type="button" onClick={generateExcel} className="download-button">Download data in Excel</button>
        <p>Scan the QR code below to view the details of your application.</p>
        <div className="qr-code">
          <QRCodeCanvas value={JSON.stringify(formData)} style={{ width: '150px', height: '150px' }} />
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;