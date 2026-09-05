import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assignmentsApi } from '../api/index.js';
import { dueLabel, formatDateLong } from '../utils/format.js';

const STATUS_LABEL = {
  not_started: 'Not started',
  in_progress: 'In progress',
  submitted: 'Submitted',
};

export default function AssignmentsPage() {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    assignmentsApi.list().then((res) => setAssignments(res.assignments));
  }, []);

  useEffect(() => {
    if (routeId) {
      assignmentsApi
        .get(routeId)
        .then((res) => setSelected(res.assignment))
        .catch(() => {});
    }
  }, [routeId]);

  function openAssignment(id) {
    navigate(`/assignments/${id}`);
    assignmentsApi.get(id).then((res) => setSelected(res.assignment));
  }

  function closeAssignment() {
    setSelected(null);
    navigate('/assignments');
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Assignments</span>
        <h1>My Assignments</h1>
        <p className="sub">Track deadlines across every course this semester.</p>
      </div>

      <div className="card">
        {!assignments &&
          [1, 2, 3].map((i) => (
            <div key={i} style={{ padding: '14px 0' }}>
              <div className="skeleton" style={{ width: '50%', marginBottom: 8 }} />
              <div className="skeleton" style={{ width: '30%' }} />
            </div>
          ))}

        {assignments && assignments.length === 0 && (
          <div className="empty-state">
            <h3>No assignments yet</h3>
            <p>Your instructors haven&apos;t posted any assignments for you yet.</p>
          </div>
        )}

        {assignments &&
          assignments.map((a) => (
            <div className="list-item" key={a._id} style={{ cursor: 'pointer' }} onClick={() => openAssignment(a._id)}>
              <div>
                <div className="title">{a.title}</div>
                <div className="desc">{a.subject}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className={`badge badge-${a.status === 'submitted' ? 'normal' : 'accent'}`}>
                  {STATUS_LABEL[a.status]}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>{dueLabel(a.deadline)}</div>
              </div>
            </div>
          ))}
      </div>

      {selected && (
        <div className="overlay" onClick={closeAssignment}>
          <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
            <button className="overlay-close" onClick={closeAssignment} aria-label="Close">
              ✕
            </button>
            <span className="badge badge-neutral" style={{ marginBottom: 12 }}>
              {selected.subject}
            </span>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>{selected.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
              {selected.description}
            </p>
            <div style={{ fontSize: 13.5, lineHeight: 2 }}>
              <div>
                <strong>Status:</strong> {STATUS_LABEL[selected.status]}
              </div>
              <div>
                <strong>Deadline:</strong> {formatDateLong(selected.deadline)}
              </div>
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--line)', fontSize: 12.5, color: 'var(--text-muted)' }}>
                <strong>Direct Link:</strong> <code style={{ userSelect: 'all' }}>{window.location.origin}/assignments/{selected._id}</code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

