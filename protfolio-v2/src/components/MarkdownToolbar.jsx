import React from 'react';
import { 
  FaBold, FaItalic, FaCode, FaLink, FaImage, FaListUl, FaHeading, FaQuoteRight 
} from 'react-icons/fa'; // Ensure you have react-icons installed

const MarkdownToolbar = ({ insertText }) => {
  const tools = [
    { label: 'Bold', format: '**bold**', icon: <FaBold /> },
    { label: 'Italic', format: '*italic*', icon: <FaItalic /> },
    { label: 'Heading', format: '# Heading', icon: <FaHeading /> },
    { label: 'Code', format: '`code`', icon: <FaCode /> },
    { label: 'Link', format: '[Link Text](url)', icon: <FaLink /> },
    { label: 'Image', format: '![Alt Text](url)', icon: <FaImage /> },
    { label: 'List', format: '\n- Item', icon: <FaListUl /> },
    { label: 'Quote', format: '\n> Quote', icon: <FaQuoteRight /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-(--surface-glass) border border-(--glass-border) rounded-t-lg">
      {tools.map((tool, index) => (
        <button
          key={index}
          type="button" // Prevent form submission
          onClick={() => insertText(tool.format)}
          className="p-2 text-(--text-muted) hover:text-(--brand-green) hover:bg-white/5 rounded transition-all"
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default MarkdownToolbar;