"use client";

import Link from "next/link";
import PropTypes from "prop-types";

export default function ProjectCard({ title, description, tags = [], href, date, type, length, highlight, image, link, repo }) {
  return (
    <article
      className="project-card rounded-lg p-6 backdrop-blur-sm shadow-md border hover:shadow-xl transition-transform transform hover:-translate-y-1"
      style={{
        background: 'linear-gradient(180deg, var(--projectcard-primary) 0%, var(--projectcard-secondary) 100%)',
        borderColor: 'rgba(32, 18, 1, 0.12)',
        color: '#201201',
      }}
      role="article"
      aria-label={title}
    >
      {image && (
        <div className="mb-4 -mt-2 -mx-2">
          <img
            src={image}
            alt={`${title} preview`}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight" style={{ color: '#201201' }}>{title}</h3>
          {date && <p className="text-sm mt-1" style={{ color: 'rgba(32,18,1,0.6)' }}>{date}</p>}
        </div>

        <div className="flex gap-2 flex-col sm:flex-row">
          {link && (
            <Link
              href={link}
              target="_blank"
              className="text-xs px-3 py-1 rounded-md transition text-center flex items-center justify-center whitespace-nowrap"
              style={{
                background: 'rgba(32,18,1,0.08)',
                border: '1px solid rgba(32,18,1,0.18)',
                color: '#201201',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(32,18,1,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(32,18,1,0.08)'}
            >
              Live Website
            </Link>
          )}
          {repo && (
            <Link
              href={repo}
              target="_blank"
              className="text-xs px-3 py-1 rounded-md transition text-center flex items-center justify-center whitespace-nowrap"
              style={{
                background: 'rgba(32,18,1,0.08)',
                border: '1px solid rgba(32,18,1,0.18)',
                color: '#201201',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(32,18,1,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(32,18,1,0.08)'}
            >
              Repo
            </Link>
          )}
        </div>
      </div>

      {(type || length) && (
        <div className="mt-2 flex flex-wrap gap-3 text-sm" style={{ color: 'rgba(32,18,1,0.65)' }}>
          {type && <span>{type}</span>}
          {length && <span>• {length}</span>}
        </div>
      )}

      {description ? (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(32,18,1,0.85)' }}>{description}</p>
      ) : null}

      {highlight && (
        <p className="mt-3 text-sm italic" style={{ color: 'rgba(32,18,1,0.65)' }}>
          <strong>Highlight:</strong> {highlight}
        </p>
      )}

      {tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: 'rgba(32,18,1,0.07)',
                border: '1px solid rgba(32,18,1,0.14)',
                color: 'rgba(32,18,1,0.75)',
              }}
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  href: PropTypes.string,
  link: PropTypes.string,
  repo: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.string,
  length: PropTypes.string,
  highlight: PropTypes.string,
  image: PropTypes.string,
};
