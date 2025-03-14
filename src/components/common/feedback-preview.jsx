"use client"

import "@uiw/react-md-editor/markdown-editor.css";

import dynamic from 'next/dynamic';

const Markdown = dynamic(
    () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
    { ssr: false }
);
const FeedbackPreview = ({ markdownText }) => {
    return (
        <div style={{ backgroundColor: 'transparent' }}>
            <Markdown
                className="feedbackMdPreview"
                source={markdownText}
                style={{ backgroundColor: 'transparent', padding: 0 }}
            />
        </div>
    );
};

export default FeedbackPreview;
