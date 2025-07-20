import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

// Generic document generator function
const generateDocument = async (apiEndpoint, templatePath, outputFileName) => {
    try {
        // Fetch data from API
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${apiEndpoint}`);
        }

        const data = await response.json();

        // Load and process template
        loadFile(templatePath, function (error, content) {
            if (error) {
                throw error;
            }

            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            doc.render(data);

            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });

            saveAs(out, outputFileName);
        });
    } catch (error) {
        console.error(`Error generating document: ${error.message}`);
        throw error;
    }
};

// Document configurations
const DOCUMENT_CONFIGS = {
    caseReport: {
        apiPath: '/api/file-generator/case-data',
        templatePath: '/templates/TEMPLATE_Social-Case-Study-Report.docx',
        outputName: 'case-report.docx'
    },
    correspondence: {
        apiPath: '/api/file-generator/correspondence-form',
        templatePath: '/templates/TEMPLATE_Correspondence-Form.docx',
        outputName: 'correspondence-form.docx'
    },
    counseling: {
        apiPath: '/api/file-generator/counseling-form',
        templatePath: '/templates/TEMPLATE_Counseling-Form.docx',
        outputName: 'counseling-form.docx'
    },
    financial: {
        apiPath: '/api/file-generator/financial-assessment-form',
        templatePath: '/templates/TEMPLATE_Financial-Assessment-Form.docx',
        outputName: 'financial-assessment-form.docx'
    },
    homeVisit: {
        apiPath: '/api/file-generator/home-visit-form',
        templatePath: '/templates/TEMPLATE_Home-Visit-Form.docx',
        outputName: 'home-visit-form.docx'
    },
    progressReport: {
        apiPath: '/api/file-generator/progress-report',
        templatePath: '/templates/TEMPLATE_Progress-Report.docx',
        outputName: 'progress-report.docx'
    }
};

// Generic document generator with configuration
const generateDocumentByType = async (documentType, id) => {
    const config = DOCUMENT_CONFIGS[documentType];
    if (!config) {
        throw new Error(`Unknown document type: ${documentType}`);
    }

    return generateDocument(
        `${config.apiPath}/${id}`,
        config.templatePath,
        config.outputName
    );
};

// Simplified exports
export const generateCaseReport = (caseId) => generateDocumentByType('caseReport', caseId);
export const generateCorrespondenceForm = (correspondenceId) => generateDocumentByType('correspondence', correspondenceId);
export const generateCounselingForm = (counselingId) => generateDocumentByType('counseling', counselingId);
export const generateFinancialAssessmentForm = (financialId) => generateDocumentByType('financial', financialId);
export const generateHomeVisitForm = (homeVisitId) => generateDocumentByType('homeVisit', homeVisitId);
export const generateProgressReport = (reportId) => generateDocumentByType('progressReport', reportId);