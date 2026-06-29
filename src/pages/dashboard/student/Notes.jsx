import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getNoteFileUrl, listNotes, deleteNote } from '../../../api';

export default function Notes() {
  const { user } = useAuth();
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
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchNotes, 5000);
    return () => clearInterval(interval);
  }, [fetchNotes]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotes();
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(n => n.id !== noteId));
      // Optional: Show success message
      console.log('Note deleted successfully');
    } catch (error) {
      const message = error?.response?.data?.detail || 'Failed to delete note';
      if (error?.response?.status === 403) {
        alert('You do not have permission to delete this note. Only teachers and admins can delete notes.');
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
      <div className="flex-between" style={{ marginBottom: 'var(--space-xl)' }}>
        <div>
          <h1 className="page-title">My Notes</h1>
          <p className="page-subtitle">PDF study materials shared by your teachers.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
            placeholder="Search notes..."
            style={{ maxWidth: 260 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-title">{search ? 'No results found' : 'No Notes Yet'}</div>
          <div className="empty-state-desc">
            {search ? `No notes match "${search}".` : "Your teacher hasn't uploaded any PDF notes yet."}
          </div>
        </div>
      ) : (
        <div className="grid grid-auto">
          {filtered.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={() => handleDeleteNote(note.id)}
              canDelete={user?.role === 'teacher' || user?.role === 'admin'}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NoteCard({ note, onDelete, canDelete }) {
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
    <div className="note-card card" style={{ borderLeft: '3px solid #6366f1' }}>
      <div className="note-header">
        <div className="note-icon" style={{ background: '#6366f122', color: '#6366f1' }}>PDF</div>
        <div className="note-meta">
          <div className="note-title">{note.title}</div>
          <div className="note-date">
            {note.created_at ? new Date(note.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
            {note.teacher_name ? ` by ${note.teacher_name}` : ''}
          </div>
        </div>
      </div>
      {note.content && <div className="note-content" style={{ marginTop: 12 }}>{note.content}</div>}
      <div style={{ marginTop: 16, display: 'flex', gap: '8px' }}>
        <a className="btn btn-primary btn-sm" href={fileUrl} target="_blank" rel="noreferrer">
          Open PDF
        </a>
        {canDelete && (
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
              fontSize: '14px',
              opacity: deleting ? 0.6 : 1
            }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  );
}
