import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import expressionParser from 'docxtemplater/expressions';

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

export const generateCaseReport = async (caseId) => {
    const data = await fetch(`/api/file-generator/case-data/${caseId}`);


    const templatePath = '/templates/TEMPLATE_Social-Case-Study-Report.docx';

    loadFile(templatePath, function (error, content) {
        if (error) {
            throw error;
        }

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            parser: expressionParser,
        });

        doc.render(data);

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(out, 'case-report.docx');
    });
};