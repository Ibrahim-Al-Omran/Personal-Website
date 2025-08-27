"use client";

import Link from "next/link";
import PropTypes from "prop-types";

export default function CactusProjectCard({ title, description, tags = [], href, date, type, length, highlight, image, link, repo }) {
  return (
    <article
      className="cactus-card cactus-segment p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
      style={{
        color: '#291203', // Darker brown from gradient for better readability
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      }}
      role="article"
      aria-label={title}
    >
      {image && (
        <div className="mb-4 -mt-2 -mx-2 relative overflow-hidden rounded-lg">
          <img 
            src={image} 
            alt={`${title} preview`}
            className="w-full h-48 object-cover rounded-lg border-2 border-cactus-green-light"
            style={{
              filter: 'sepia(10%) saturate(110%) hue-rotate(10deg)',
            }}
          />
          {/* Desert overlay pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-desert-tan/10"></div>
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight" style={{ color: '#1a4d0a' }}>
            {title}
          </h3>
          {date && (
            <p className="text-sm mt-1" style={{ color: '#291203' }}>
              {date}
            </p>
          )}
        </div>

        <div className="flex gap-2 flex-col sm:flex-row">
          {link && (
            <Link
              href={link}
              target="_blank"
              className="cactus-button text-xs px-4 py-2 text-center transition-all duration-200 hover:cactus-cursor-pointer"
              style={{
                fontSize: '0.75rem',
                padding: '8px 16px',
              }}
            >
              Live Site
            </Link>
          )}
          {repo && (
            <Link
              href={repo}
              target="_blank"
              className="cactus-button text-xs px-4 py-2 text-center transition-all duration-200 hover:cactus-cursor-pointer"
              style={{
                fontSize: '0.75rem',
                padding: '8px 16px',
                background: 'linear-gradient(45deg, var(--earth-brown), var(--earth-bark))',
              }}
            >
              Code
            </Link>
          )}
        </div>
      </div>

      <p className="cactus-text-dark mt-4 text-sm leading-relaxed">{description}</p>

      {/* Cactus-themed tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-3 py-1 rounded-full border-2 transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--cactus-green-light)',
                border: '2px solid var(--cactus-green-medium)',
                color: '#1a4d0a',
                boxShadow: '0 2px 4px rgba(45, 80, 22, 0.3)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Additional metadata */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-cactus-green-light/30">
        {type && (
          <span className="text-xs text-earth-bark/60 flex items-center gap-1">
            <span>🏷️</span>
            {type}
          </span>
        )}
        {length && (
          <span className="text-xs text-earth-bark/60 flex items-center gap-1">
            <span>⏱️</span>
            {length}
          </span>
        )}
        
      </div>

      {/* Decorative desert elements */}
      <div className="absolute top-2 right-2 text-xs opacity-50">
        <span className="animate-pulse">☀️</span>
      </div>
    </article>
  );
}

CactusProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  href: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.string,
  length: PropTypes.string,
  highlight: PropTypes.bool,
  image: PropTypes.string,
  link: PropTypes.string,
  repo: PropTypes.string,
};
