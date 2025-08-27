"use client";

import Link from "next/link";
import PropTypes from "prop-types";

export default function ProjectCard({ title, description, tags = [], href, date, type, length, highlight, image, link, repo }) {
  return (
    <article
      className="project-card rounded-lg p-6 backdrop-blur-sm text-white shadow-lg border border-white/10 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
      style={{
        background: 'linear-gradient(180deg, var(--projectcard-primary) 0%, var(--projectcard-secondary) 100%)',
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
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          {date && <p className="text-sm text-white/70 mt-1">{date}</p>}
        </div>

        <div className="flex gap-2 flex-col sm:flex-row">
          {link && (
            <Link
              href={link}
              target="_blank"
              className="text-xs px-3 py-1 bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition text-center flex items-center justify-center whitespace-nowrap"
            >
              Live Website
            </Link>
          )}
          {repo && (
            <Link
              href={repo}
              target="_blank"
              className="text-xs px-3 py-1 bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition text-center flex items-center justify-center whitespace-nowrap"
            >
              Repo
            </Link>
          )}
        </div>
      </div>

      {(type || length) && (
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/80">
          {type && <span>{type}</span>}
          {length && <span>• {length}</span>}
        </div>
      )}

      {description ? (
        <p className="mt-3 text-sm opacity-90 leading-relaxed">{description}</p>
      ) : null}

      {highlight && (
        <p className="mt-3 text-sm italic text-white/70">
          <strong>Highlight:</strong> {highlight}
        </p>
      )}

      {tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
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
  href: PropTypes.string, // deprecated, keeping for backward compatibility
  link: PropTypes.string,
  repo: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.string,
  length: PropTypes.string,
  highlight: PropTypes.string,
  image: PropTypes.string,
};
