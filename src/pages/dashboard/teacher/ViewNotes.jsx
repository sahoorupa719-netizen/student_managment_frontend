import { useCallback, useEffect, useState } from 'react';
import { getNoteFileUrl, listNotes, deleteNote } from '../../../api';

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotes = useCallback(async () => {
    try {
      const r = await listNotes();
      setNotes(r.data?.data || r.data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Fetch notes on mount and set up real-time polling
  useEffect(() => {
    fetchNotes();
    const interval = setInterval(fetchNotes, 5000);
    return () => clearInterval(interval);
  }, [fetchNotes]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotes();
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) return;
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(n => n.id !== noteId));
      console.log('Note deleted successfully');
    } catch (error) {
      const message = error?.response?.data?.detail || 'Failed to delete note';
      if (error?.response?.status === 403) {
        alert('You do not have permission to delete this note.');
      } else if (error?.response?.status === 404) {
        alert('Note not found or already deleted.');
      } else {
        alert(`Error: ${message}`);
      }
      console.error('Delete error:', error);
    }
  };

  const filtered = notes.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.content?.toLowerCase().includes(search.toLowerCase()) ||
    n.teacher_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Manage Notes</h1>
        <p className="page-subtitle">View and manage all uploaded PDF notes.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: 'var(--space-xl)', alignItems: 'center' }}>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          style={{
            padding: '8px 16px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: refreshing ? 'not-allowed' : 'pointer',
            opacity: refreshing ? 0.6 : 1
          }}
        >
          {refreshing ? 'Refreshing...' : '🔄 Refresh'}
        </button>
        <input
          className="form-control"
          placeholder="Search notes by title or description..."
          style={{ flex: 1, maxWidth: 400 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span style={{ color: '#666', fontSize: '14px' }}>
          {filtered.length} of {notes.length}
        </span>
      </div>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-title">No Notes Yet</div>
          <div className="empty-state-desc">
            You haven't uploaded any PDF notes yet. Go to "Add PDF Note" to upload notes for your students.
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-title">No Results Found</div>
          <div className="empty-state-desc">
            No notes match "{search}". Try a different search term.
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NoteCard({ note, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const token = localStorage.getItem('token');
  const fileUrl = `${getNoteFileUrl(note.id)}?token=${encodeURIComponent(token || '')}`;

  const handleDeleteClick = async () => {
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="card" style={{ borderLeft: '4px solid #6366f1', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>PDF Note</div>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
          {note.title}
        </h3>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
          {note.created_at ? new Date(note.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
        </p>
      </div>

      {note.content && (
        <div style={{ 
          marginBottom: '12px', 
          padding: '10px', 
          background: '#f3f4f6', 
          borderRadius: '4px', 
          fontSize: '13px', 
          color: '#555',
          maxHeight: '80px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {note.content}
        </div>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <a 
          className="btn btn-primary btn-sm" 
          href={fileUrl} 
          target="_blank" 
          rel="noreferrer"
          style={{ flex: 1 }}
        >
          📄 View PDF
        </a>
        <button
          onClick={handleDeleteClick}
          disabled={deleting}
          style={{
            padding: '6px 12px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: deleting ? 'not-allowed' : 'pointer',
            fontSize: '13px',
            opacity: deleting ? 0.6 : 1,
            flex: 1
          }}
        >
          {deleting ? '⏳ Deleting...' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  );
}
