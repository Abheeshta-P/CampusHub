import { useState } from 'react';

export default function CopyStudentId({ studentId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(studentId || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button type="button" className="btn btn-secondary" onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy Student ID'}
    </button>
  );
}
