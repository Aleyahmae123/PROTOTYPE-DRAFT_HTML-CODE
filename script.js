const htmlInput = document.getElementById('htmlInput');
const previewFrame = document.getElementById('previewFrame');

function updatePreview() {
    const content = htmlInput.value;
    const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    
    iframeDoc.open();
    iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    margin: 0;
                    padding: 12px;
                    color: #1e293b;
                }
                h1 {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #0f172a;
                    margin-top: 0;
                    margin-bottom: 0.75rem;
                }
                p {
                    font-size: 1rem;
                    color: #334155;
                    margin-top: 0;
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }
                a {
                    color: #0284c7;
                    text-decoration: underline;
                    font-weight: 500;
                }
                img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin-top: 0.5rem;
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);
    iframeDoc.close();
}

function insertTag(tagSnippet) {
    const start = htmlInput.selectionStart;
    const end = htmlInput.selectionEnd;
    const val = htmlInput.value;

    if (start !== undefined && end !== undefined) {
        htmlInput.value = val.substring(0, start) + tagSnippet + val.substring(end);
        htmlInput.selectionStart = htmlInput.selectionEnd = start + tagSnippet.length;
    } else {
        htmlInput.value += tagSnippet;
    }
    
    htmlInput.focus();
    updatePreview();
}

htmlInput.addEventListener('input', updatePreview);
window.onload = updatePreview;