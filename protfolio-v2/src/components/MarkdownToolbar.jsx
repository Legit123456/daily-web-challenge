import React from 'react';

const MarkdownToolbar = ({ insertText }) => {
  const tools = [
    { label: 'B', format: '**bold**', icon: 'font-bold' },
    { label: 'I', format: '*italic*', icon: 'italic' },
    { label: '</>', format: '`code`', icon: 'code' },
    { label: 'H1', format: '# Heading', icon: 'heading' },
    { label: 'H2', format: '## Heading', icon: 'heading' },
    { label: '🔗', format: '[Link Text](url)', icon: 'link' },
    { label: '🖼️', format: '![Alt Text](image-url)', icon: 'image' },
    { label: '📝', format: '\n- List Item', icon: 'list' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-[var(--surface-glass)] border border-[var(--glass-border)] rounded-t-lg">
      {tools.map((tool, index) => (
        <button
          key={index}
          type="button"
          onClick={() => insertText(tool.format)}
          className="px-3 py-1 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--brand-green)] hover:bg-white/5 rounded transition-colors"
          title={tool.format}
        >
          {tool.label}
        </button>
      ))}
    </div>
  );
};

export default MarkdownToolbar;