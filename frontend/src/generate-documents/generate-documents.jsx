import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

export const generateCaseReport = async (caseId) => {
    const data = await fetch(`/api/file-generator/case-data/${caseId}`);
    if (!data.ok) {
        throw new Error('Failed to fetch case data');
    }

    const caseData = await data.json();
    // console.log('Case Data:', caseData);

    const templatePath = '/templates/TEMPLATE_Social-Case-Study-Report.docx';

    loadFile(templatePath, function (error, content) {
        if (error) {
            throw error;
        }

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(caseData);

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(out, 'case-report.docx');
    });
};

export const generateCorrespondenceForm = async (correspondenceId) => {
    const data = await fetch(`/api/file-generator/correspondence-form/${correspondenceId}`);
    if (!data.ok) {
        throw new Error('Failed to fetch correspondence data');
    }

    const correspondenceData = await data.json();
    // console.log('Correspondence Data:', correspondenceData);

    const templatePath = '/templates/TEMPLATE_Correspondence-Form.docx';

    loadFile(templatePath, function (error, content) {
        if (error) {
            throw error;
        }

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(correspondenceData);

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(out, 'correspondence-form.docx');
    });
}

export const generateCounselingForm = async (counselingId) => {
    const data = await fetch(`/api/file-generator/counseling-form/${counselingId}`);
    if (!data.ok) {
        throw new Error('Failed to fetch counseling data');
    }

    const counselingData = await data.json();
    // console.log('Counseling Data:', counselingData);

    const templatePath = '/templates/TEMPLATE_Counseling-Form.docx';

    loadFile(templatePath, function (error, content) {
        if (error) {
            throw error;
        }

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(counselingData);

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(out, 'counseling-form.docx');
    });
}

export const generateFinancialAssessmentForm = async (financialId) => {
    const data = await fetch(`/api/file-generator/financial-assessment-form/${financialId}`);
    if (!data.ok) {
        throw new Error('Failed to fetch financial data');
    }

    const financialData = await data.json();
    // console.log('Financial Data:', financialData);

    const templatePath = '/templates/TEMPLATE_Financial-Assessment-Form.docx';

    loadFile(templatePath, function (error, content) {
        if (error) {
            throw error;
        }

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(financialData);

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(out, 'financial-assessment-form.docx');
    });
}