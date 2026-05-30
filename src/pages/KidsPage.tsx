import React from 'react';
import { useKidsContents } from '../hooks/useKidsContents';
import ContentCard from '../components/ContentCard';
import { useNavigate } from 'react-router-dom';

const KidsPage: React.FC = () => {
  const { data, loading, error } = useKidsContents();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="section-title">Kids Contents</h2>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="content-grid">
        {data.map((item) => (
          <ContentCard
            key={item.id}
            title={item.name}
            image={item.image_url}
            subtitle={item.ott_origin}
            onClick={() => navigate(`/player/kids/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default KidsPage;
