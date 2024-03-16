import React from 'react';
import DOMPurify from 'dompurify';

function APIToHTML({ data }) {
    const sanitizeHTML = DOMPurify.sanitize(data);
    return <div className="text-left api-to-html" dangerouslySetInnerHTML={{ __html: sanitizeHTML }} />;
}

export default APIToHTML;
