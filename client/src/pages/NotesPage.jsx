import { useEffect, useState } from 'react';
import { notesApi } from '../api/index.js';
import { useToast } from '../context/ToastContext.jsx';

export default function NotesPage() {
  const { showToast } = useToast();
  const [notes, setNotes] = useState(null);
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    notesApi.list().then((res) => setNotes(res.notes));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    setSubmitting(true);
    try {
      const { note } = await notesApi.create(draft.trim());
      setNotes((prev) => [note, ...(prev || [])]);
      setDraft('');
      showToast('Note added.', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const prev = notes;
    setNotes((cur) => cur.filter((n) => n._id !== id));
    try {
      await notesApi.remove(id);
    } catch (err) {
      setNotes(prev);
      showToast(err.message, 'error');
    }
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">My Notes</span>
        <h1>My Notes</h1>
        <p className="sub">Quick personal notes — only visible to you.</p>
      </div>

      <form className="note-composer" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Write a quick note…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
          Add Note
        </button>
      </form>

      {!notes &&
        [1, 2].map((i) => <div key={i} className="skeleton" style={{ height: 46, marginBottom: 10 }} />)}

      {notes && notes.length === 0 && (
        <div className="empty-state">
          <h3>No notes yet</h3>
          <p>Notes you jot down here are just for you.</p>
        </div>
      )}

      {notes &&
        notes.map((n) => (
          <div className="note-card" key={n._id}>
            <div className="note-text">{n.content}</div>
            <button type="button" className="delete-btn" onClick={() => handleDelete(n._id)}>
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
