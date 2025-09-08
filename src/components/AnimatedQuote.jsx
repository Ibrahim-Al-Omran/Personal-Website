'use client';

import { useEffect, useState } from 'react';

const AnimatedQuote = ({ 
  text, 
  author, 
  startDelay = 1000,
  letterDelay = 30,
  wordDelay = 150,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  // Split text into words, then each word into letters
  const words = text.split(' ');
  let totalLetterIndex = 0;

  return (
    <div className={`animated-quote ${className}`}>
      <div className="quote-text">
        {words.map((word, wordIndex) => {
          const letters = word.split('');
          const wordStartIndex = totalLetterIndex;
          totalLetterIndex += letters.length;
          
          return (
            <span key={wordIndex} className="word-wrapper inline-block">
              {letters.map((letter, letterIndex) => {
                const globalLetterIndex = wordStartIndex + letterIndex;
                const delay = globalLetterIndex * letterDelay + (wordIndex * wordDelay);
                
                return (
                  <span
                    key={letterIndex}
                    className={`letter ${isVisible ? 'animate-letter-fade' : 'opacity-0'}`}
                    style={{
                      animationDelay: `${delay}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
              {/* Add space after each word except the last */}
              {wordIndex < words.length - 1 && (
                <span
                  className={`letter ${isVisible ? 'animate-letter-fade' : 'opacity-0'}`}
                  style={{
                    animationDelay: `${totalLetterIndex * letterDelay + (wordIndex * wordDelay)}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  &nbsp;
                </span>
              )}
            </span>
          );
        })}
      </div>
      
      {author && isVisible && (
        <div 
          className="author-attribution mt-3 text-right opacity-0 text-lg animate-author-fade"
          style={{
            animationDelay: `${(totalLetterIndex + words.length) * letterDelay + 500}ms`,
            animationFillMode: 'both'
          }}
        >
          — {author}
        </div>
      )}
    </div>
  );
};

export default AnimatedQuote;
