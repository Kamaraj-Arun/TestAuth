import React, { useState } from 'react';
import "../../styles/toggleList.css";

const ToggleList = ({ sentences }: any) => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  // Toggle expand/collapse
  const toggleExpand = (index: never) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  return (
    <div className='toggleListContainer'>
      {sentences.map((sentence: { text: string, subsection: string }, index: never) => (
        <div key={index}>
          <div className="sentenceRow">
            <span>{index + 1}. {sentence.text}</span>
            <span
              onClick={() => toggleExpand(index)}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              {expandedIndexes.includes(index) ? '−' : '+'}
            </span>
          </div>
          {expandedIndexes.includes(index) && sentence.subsection && (
            <div className={`subsection ${expandedIndexes.includes(index) ? 'expanded' : ''}`}>
              {sentence.subsection}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToggleList;