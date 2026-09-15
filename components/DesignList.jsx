'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

export default function DesignList({ userId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    client: ''
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT || 5087}/api/portfolio`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message || 'Error loading projects');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditForm({
      title: project.title || '',
      description: project.description || '',
      image_url: project.image_url || '',
      category: project.category || '',
      client: project.client || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      title: '',
      description: '',
      image_url: '',
      category: '',
      client: ''
    });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    
    if (!editForm.title.trim() || !editForm.description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      setActionLoading(true);
      setError('');

      const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT || 5087}/api/portfolio/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update project');
      }

      await fetchProjects();
      handleCancelEdit();
    } catch (err) {
      setError(err.message || 'Error updating project');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClick = (projectId) => {
    setDeleteConfirm(projectId);
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      setActionLoading(true);
      setError('');

      const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT || 5087}/api/portfolio/${deleteConfirm}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      await fetchProjects();
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message || 'Error deleting project');
    } finally {
      setActionLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="design-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading your designs...</p>
      </div>
    );
  }

  if (error && !actionLoading) {
    return (
      <div className="design-list-error">
        <p className="error-message">{error}</p>
        <button onClick={fetchProjects} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="design-list-empty">
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h3>No designs yet</h3>
          <p>Create your first design project to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="design-list">
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <h3>Delete Project</h3>
            <p>Are you sure you want to delete this project? This action cannot be undone.</p>
            <div className="dialog-actions">
              <button 
                onClick={handleCancelDelete} 
                className="button-secondary"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete} 
                className="button-danger"
                disabled={actionLoading}
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            {editingId === project.id ? (
              <div className="edit-form-container">
                <form onSubmit={handleUpdateProject} className="project-edit-form">
                  <div className="form-group">
                    <label htmlFor={`title-${project.id}`}>Title</label>
                    <input
                      type="text"
                      id={`title-${project.id}`}
                      name="title"
                      value={editForm.title}
                      onChange={handleInputChange}
                      required
                      disabled={actionLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`description-${project.id}`}>Description</label>
                    <textarea
                      id={`description-${project.id}`}
                      name="description"
                      value={editForm.description}
                      onChange={handleInputChange}
                      rows="4"
                      required
                      disabled={actionLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`image-${project.id}`}>Image URL</label>
                    <input
                      type="url"
                      id={`image-${project.id}`}
                      name="image_url"
                      value={editForm.image_url}
                      onChange={handleInputChange}
                      disabled={actionLoading}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`category-${project.id}`}>Category</label>
                      <input
                        type="text"
                        id={`category-${project.id}`}
                        name="category"
                        value={editForm.category}
                        onChange={handleInputChange}
                        disabled={actionLoading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`client-${project.id}`}>Client</label>
                      <input
                        type="text"
                        id={`client-${project.id}`}
                        name="client"
                        value={editForm.client}
                        onChange={handleInputChange}
                        disabled={actionLoading}
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="button" 
                      onClick={handleCancelEdit} 
                      className="button-secondary"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="button-primary"
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="project-display">
                <ProjectCard project={project} />
                <div className="project-actions">
                  <button 
                    onClick={() => handleEdit(project)} 
                    className="action-button edit-button"
                    disabled={actionLoading}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(project.id)} 
                    className="action-button delete-button"
                    disabled={actionLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .design-list {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .design-list-loading,
        .design-list-error,
        .design-list-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 2px solid #f0f0f0;
          border-top: 2px solid #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          color: #c00;
          margin-bottom: 1rem;
        }

        .retry-button,
        .button-secondary,
        .button-primary,
        .button-danger {
          padding: 0.75rem 1.5rem;
          border: 1px solid #000;
          background: #fff;
          color: #000;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .retry-button:hover,
        .button-secondary:hover {
          background: #000;
          color: #fff;
        }

        .button-primary {
          background: #000;
          color: #fff;
        }

        .button-primary:hover {
          background: #333;
        }

        .button-danger {
          background: #c00;
          color: #fff;
          border-color: #c00;
        }

        .button-danger:hover {
          background: #900;
          border-color: #900;
        }

        .button-secondary:disabled,
        .button-primary:disabled,
        .button-danger:disabled,
        .action-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .empty-state {
          max-width: 400px;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          border: 2px solid #ddd;
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          position: relative;
        }

        .empty-icon::before,
        .empty-icon::after {
          content: '';
          position: absolute;
          background: #ddd;
        }

        .empty-icon::before {
          width: 2px;
          height: 40px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .empty-icon::after {
          width: 40px;
          height: 2px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 300;
        }

        .empty-state p {
          color: #666;
          line-height: 1.6;
        }

        .error-banner {
          background: #fff0f0;
          border: 1px solid #c00;
          padding: 1rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .error-banner p {
          color: #c00;
          margin: 0;
        }

        .close-error {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #c00;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .confirm-dialog {
          background: #fff;
          padding: 2rem;
          max-width: 450px;
          width: 90%;
          border: 1px solid #000;
        }

        .confirm-dialog h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 300;
        }

        .confirm-dialog p {
          margin-bottom: 2rem;
          line-height: 1.6;
          color: #666;
        }

        .dialog-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .projects-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .project-item {
          border: 1px solid #e0e0e0;
          padding: 1.5rem;
          background: #fff;
        }

        .project-display {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .project-actions {
          display: flex;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e0e0e0;
        }

        .action-button {
          padding: 0.5rem 1.5rem;
          border: 1px solid #000;
          background: #fff;
          color: #000;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .action-button:hover {
          background: #000;
          color: #fff;
        }

        .delete-button {
          border-color: #c00;
          color: #c00;
        }

        .delete-button:hover {
          background: #c00;
          color: #fff;
        }

        .edit-form-container {
          width: 100%;
        }

        .project-edit-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: #333;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #000;
        }

        .form-group input:disabled,
        .form-group textarea:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid #e0e0e0;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .project-actions,
          .form-actions {
            flex-direction: column;
          }

          .action-button,
          .button-secondary,
          .button-primary {
            width: 100%;
          }

          .dialog-actions {
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </div>
  );
}