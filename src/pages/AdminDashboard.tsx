import React, { useState } from 'react';
import { useOttContents } from '../hooks/useOttContents';
import { useKidsContents } from '../hooks/useKidsContents';
import { deleteOttContent, addOttContent, updateOttContent, uploadOttImage } from '../api/ottServices';
import { deleteKidsContent, addKidsContent, updateKidsContent, uploadKidsImage } from '../api/kidsServices';

const AdminDashboard: React.FC = () => {
  const { data: ottData, loading: ottLoading, error: ottError } = useOttContents();
  const { data: kidsData, loading: kidsLoading, error: kidsError } = useKidsContents();
  
  const [activeTab, setActiveTab] = useState<'ott' | 'kids'>('ott');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteOtt = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteOttContent(id);
        alert('Deleted successfully');
        window.location.reload();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const handleDeleteKids = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteKidsContent(id);
        alert('Deleted successfully');
        window.location.reload();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const handleEditClick = (item: any) => {
    setFormData(item);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'ott') {
        if (isEdit) await updateOttContent(formData);
        else await addOttContent(formData);
      } else {
        if (isEdit) await updateKidsContent(formData);
        else await addKidsContent(formData);
      }
      alert('Saved successfully');
      setShowForm(false);
      window.location.reload();
    } catch (err) {
      alert('Save failed');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = activeTab === 'ott' ? await uploadOttImage(file) : await uploadKidsImage(file);
      if (res.status) {
        setFormData({ ...formData, [activeTab === 'ott' ? 'image' : 'image_url']: res.image_url });
        alert('Image uploaded successfully');
      }
    } catch (err) {
      alert('Upload failed');
    }
  };

  if (ottLoading || kidsLoading) return <div className="loader">Loading Management...</div>;
  if (ottError || kidsError) return <div className="error-message">Error loading data</div>;

  return (
    <div className="container" style={{ cursor: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Admin Management</h1>
        <button 
          className="focusable" 
          onClick={() => {
            setFormData({});
            setIsEdit(false);
            setShowForm(true);
          }}
          style={{ padding: '10px 20px', backgroundColor: 'var(--accent-color)' }}
          tabIndex={0}
        >
          + Add New Content
        </button>
      </div>
      
      {showForm && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 2000, 
          display: 'flex', justifyContent: 'center', alignItems: 'center' 
        }}>
          <form 
            onSubmit={handleSave}
            style={{ backgroundColor: 'var(--card-bg)', padding: '40px', borderRadius: '12px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <h2>{isEdit ? 'Edit' : 'Add New'} {activeTab === 'ott' ? 'OTT' : 'Kids'} Content</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label>Name:</label>
              <input 
                type="text" required className="focusable" tabIndex={0}
                value={formData.name || ''}
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Upload Image:</label>
              <input 
                type="file" className="focusable" tabIndex={0}
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                onChange={handleImageUpload}
              />
              {formData[activeTab === 'ott' ? 'image' : 'image_url'] && (
                <p style={{ fontSize: '0.8rem', color: '#8197a4' }}>Current: {formData[activeTab === 'ott' ? 'image' : 'image_url']}</p>
              )}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Or Image URL:</label>
              <input 
                type="text" required className="focusable" tabIndex={0}
                value={formData[activeTab === 'ott' ? 'image' : 'image_url'] || ''}
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                onChange={(e) => setFormData({...formData, [activeTab === 'ott' ? 'image' : 'image_url']: e.target.value})}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Link:</label>
              <input 
                type="text" required className="focusable" tabIndex={0}
                value={formData.link || ''}
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
              />
            </div>

            {activeTab === 'ott' && (
               <div style={{ marginBottom: '15px' }}>
               <label>Type:</label>
               <select 
                 className="focusable" tabIndex={0}
                 value={formData.type || 'movie'}
                 style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                 onChange={(e) => setFormData({...formData, type: e.target.value})}
               >
                 <option value="movie">Movie</option>
                 <option value="live">Live</option>
                 <option value="serial">Serial</option>
                 <option value="show">Show</option>
                 <option value="sport">Sport</option>
               </select>
             </div>
            )}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="focusable" tabIndex={0} style={{ flex: 1, padding: '10px' }}>Save</button>
              <button 
                type="button" className="focusable" tabIndex={0} 
                style={{ flex: 1, padding: '10px', backgroundColor: '#555' }}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <button 
          className={`focusable ${activeTab === 'ott' ? 'active' : ''}`}
          onClick={() => setActiveTab('ott')}
          style={{ padding: '10px 30px', cursor: 'pointer' }}
          tabIndex={0}
        >
          Manage OTT
        </button>
        <button 
          className={`focusable ${activeTab === 'kids' ? 'active' : ''}`}
          onClick={() => setActiveTab('kids')}
          style={{ padding: '10px 30px', cursor: 'pointer' }}
          tabIndex={0}
        >
          Manage Kids
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', padding: '20px', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #333' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>Name</th>
              <th style={{ padding: '15px' }}>Type/Origin</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'ott' ? (
              ottData.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '15px' }} data-label="ID">{item.id}</td>
                  <td style={{ padding: '15px' }} data-label="Name">{item.name}</td>
                  <td style={{ padding: '15px' }} data-label="Type">{item.type}</td>
                  <td style={{ padding: '15px' }} data-label="Actions">
                    <button 
                      className="focusable" 
                      style={{ marginRight: '10px', padding: '5px 15px' }} 
                      onClick={() => handleEditClick(item)}
                      tabIndex={0}
                    >
                      Edit
                    </button>
                    <button 
                      className="focusable" 
                      style={{ backgroundColor: '#ff4d4d', padding: '5px 15px' }} 
                      onClick={() => handleDeleteOtt(item.id)}
                      tabIndex={0}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              kidsData.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '15px' }} data-label="ID">{item.id}</td>
                  <td style={{ padding: '15px' }} data-label="Name">{item.name}</td>
                  <td style={{ padding: '15px' }} data-label="Origin">{item.ott_origin}</td>
                  <td style={{ padding: '15px' }} data-label="Actions">
                    <button 
                      className="focusable" 
                      style={{ marginRight: '10px', padding: '5px 15px' }} 
                      onClick={() => handleEditClick(item)}
                      tabIndex={0}
                    >
                      Edit
                    </button>
                    <button 
                      className="focusable" 
                      style={{ backgroundColor: '#ff4d4d', padding: '5px 15px' }} 
                      onClick={() => handleDeleteKids(item.id)}
                      tabIndex={0}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
