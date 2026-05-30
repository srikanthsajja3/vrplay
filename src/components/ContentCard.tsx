import React from 'react';

interface ContentCardProps {
  title: string;
  image: string;
  subtitle?: string;
  onClick?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, image, subtitle, onClick }) => {
  return (
    <div className="content-card focusable" onClick={onClick} tabIndex={0}>
      <img src={image} alt={title} onError={(e) => {
        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x169?text=No+Image';
      }} />
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default ContentCard;
