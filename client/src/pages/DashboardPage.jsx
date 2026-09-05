import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { eventsApi, assignmentsApi, notesApi } from '../api/index.js';
import { formatDate, dueLabel, greeting } from '../utils/format.js';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [events, assignments, notes] = await Promise.all([
          eventsApi.list(),
          assignmentsApi.list(),
          notesApi.list(),
        ]);
        if (!active) return;
        setData({
          events: events.events,
          assignments: assignments.assignments,
          notes: notes.notes,
        });
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ width: 260, height: 30, marginBottom: 24 }} />
        <div className="card-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card">
              <div className="skeleton" style={{ width: '60%', marginBottom: 10 }} />
              <div className="skeleton" style={{ width: 50, height: 28 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const pendingAssignments = data.assignments.filter((a) => a.status !== 'submitted');
  const upcomingEvents = data.events.slice(0, 3);
  const recentNotes = data.notes.slice(0, 3);

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Dashboard</span>
        <h1>
          {greeting()}, {user?.name?.split(' ')[0]}
        </h1>
        <p className="sub">Here&apos;s what&apos;s happening across campus today.</p>
      </div>

      <div className="card-grid">
        <div className="card stat-card">
          <div className="stat-label">Upcoming Assignments</div>
          <div className="stat-value">{pendingAssignments.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Upcoming Events</div>
          <div className="stat-value">{data.events.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Saved Notes</div>
          <div className="stat-value">{data.notes.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Academic Program</div>
          <div className="stat-value" style={{ fontSize: 16, marginTop: 4 }}>
            {user?.department || 'Computer Science'}
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="card">
          {upcomingEvents.map((ev) => (
            <div className="list-item" key={ev._id}>
              <div>
                <div className="title">{ev.title}</div>
                <div className="desc">
                  {formatDate(ev.date)} · {ev.time} · {ev.location}
                </div>
              </div>
              <span className="badge badge-neutral">{ev.type}</span>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <Link to="/events" className="btn btn-ghost" style={{ padding: 0 }}>
              View all events →
            </Link>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Pending Assignments</h2>
        <div className="card">
          {pendingAssignments.slice(0, 3).map((a) => (
            <div className="list-item" key={a._id}>
              <div>
                <div className="title">{a.title}</div>
                <div className="desc">{a.subject}</div>
              </div>
              <span className="badge badge-accent">{dueLabel(a.deadline)}</span>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <Link to="/assignments" className="btn btn-ghost" style={{ padding: 0 }}>
              View all assignments →
            </Link>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Quick Notes</h2>
        <div className="card">
          {recentNotes.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>No notes saved yet.</div>
          )}
          {recentNotes.map((n) => (
            <div className="list-item" key={n._id}>
              <div className="title" style={{ fontWeight: 400 }}>{n.content}</div>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <Link to="/notes" className="btn btn-ghost" style={{ padding: 0 }}>
              View all notes →
            </Link>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Placement Cell Notice</h2>
        <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
          <div className="title" style={{ marginBottom: 4 }}>
            Pre-Placement Technical Assessment Drive
          </div>
          <div className="desc">
            Registration closes this Friday. All final and pre-final year students must complete their registration through the Career Services desk.
          </div>
        </div>
      </div>
    </div>
  );
}

