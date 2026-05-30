import React from 'react';
import { useOttContents } from '../hooks/useOttContents';
import ContentCard from '../components/ContentCard';
import { useNavigate } from 'react-router-dom';

const OttPage: React.FC = () => {
  const { data, loading, error } = useOttContents();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="section-title">OTT Contents</h2>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="content-grid">
        {data.map((item) => (
          <ContentCard
            key={item.id}
            title={item.name}
            image={item.thumbnail || item.image}
            subtitle={item.type}
            onClick={() => navigate(`/player/ott/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default OttPage;
