# SmartDoc Manager

SmartDoc Manager is a React application for collecting, reviewing, and exporting structured documents. It combines drag-and-drop file intake with form-based editing and client-side document tools to make document preparation easier to complete and share.

## Features

- Guided application and document forms
- Drag-and-drop file upload with `react-dropzone`
- Review workflow before export
- PDF generation with `jsPDF` and `html2canvas`
- Excel import and export with `ExcelJS` and `xlsx`
- QR code generation for shareable documents
- Signature capture and speech-recognition support
- Internationalized UI with `i18next`

## Tech Stack

- React 18
- React Router 6
- Create React App
- JavaScript and CSS
- jsPDF, html2canvas, ExcelJS, and xlsx

## Getting Started

```bash
git clone https://github.com/Prasanth-sakunala/smart-application.git
cd smart-application
npm install
npm start
```

The development server opens at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm test` | Run the test suite |
| `npm run build` | Create a production build |

## Project Structure

```text
src/components/   Form, upload, review, and download screens
src/styles/       Component styles
src/App.js        Application routes and composition
public/           Static assets
```

## License

No license is currently specified for this repository.
