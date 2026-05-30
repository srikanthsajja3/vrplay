import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getOttContentById } from '../api/ottServices';
import { getKidsContentById } from '../api/kidsServices';

const PlayerPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<{ name: string; link: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id || !type) return;

      try {
        setLoading(true);
        if (type === 'ott') {
          const data = await getOttContentById(id);
          setContent({ name: data.name, link: data.link });
        } else if (type === 'kids') {
          const data = await getKidsContentById(id);
          setContent({ name: data.name, link: data.link });
        }
      } catch (err) {
        setError('Failed to load content details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, type]);

  if (loading) return <div className="loader">Loading Player...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!content) return <div className="error-message">Content not found</div>;

  const Player = ReactPlayer as any;

  return (
    <div className="container">
      <button 
        onClick={() => navigate(-1)} 
        className="focusable"
        tabIndex={0}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--accent-color)', 
          cursor: 'pointer',
          padding: '10px 0',
          fontSize: '1rem',
          outline: 'none'
        }}
      >
        ← Back
      </button>
      
      <h2 style={{ margin: '10px 0 20px 0' }}>{content.name}</h2>
      
      <div style={{ 
        position: 'relative', 
        paddingTop: '56.25%', // 16:9 Aspect Ratio
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <Player
          url={content.link}
          controls={true}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 } as any}
          playing={true}
        />
      </div>

      <div style={{ marginTop: '20px', color: '#8197a4' }}>
        <p>You are watching {content.name} on VRPlay.</p>
      </div>
    </div>
  );
};

export default PlayerPage;
