import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownRenderer({ markdown }) {
    return (
        <ReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    let match = (className || '').match(/language-(\w+)/);
                    return !inline  ? (
                        <SyntaxHighlighter
                            style={oneDark}
                            language={'mermaid'}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
}