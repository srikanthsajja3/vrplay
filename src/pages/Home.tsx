import React from 'react';
import { useOttContents } from '../hooks/useOttContents';
import { useKidsContents } from '../hooks/useKidsContents';
import ContentCard from '../components/ContentCard';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { data: ottData, loading: ottLoading, error: ottError } = useOttContents();
  const { data: kidsData, loading: kidsLoading, error: kidsError } = useKidsContents();
  const navigate = useNavigate();

  return (
    <div className="container">
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="section-title">Trending OTT</h2>
          <Link to="/ott" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>View All</Link>
        </div>
        {ottLoading && <div className="loader">Loading...</div>}
        {ottError && <div className="error-message">{ottError}</div>}
        <div className="content-grid">
          {ottData.slice(0, 5).map((item) => (
            <ContentCard
              key={item.id}
              title={item.name}
              image={item.thumbnail || item.image}
              subtitle={item.type}
              onClick={() => navigate(`/player/ott/${item.id}`)}
            />
          ))}
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="section-title">Kids Special</h2>
          <Link to="/kids" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>View All</Link>
        </div>
        {kidsLoading && <div className="loader">Loading...</div>}
        {kidsError && <div className="error-message">{kidsError}</div>}
        <div className="content-grid">
          {kidsData.slice(0, 5).map((item) => (
            <ContentCard
              key={item.id}
              title={item.name}
              image={item.image_url}
              subtitle={item.ott_origin}
              onClick={() => navigate(`/player/kids/${item.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
