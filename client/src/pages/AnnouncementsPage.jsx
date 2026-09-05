import { useEffect, useState } from 'react';
import { announcementsApi } from '../api/index.js';
import { formatDateLong } from '../utils/format.js';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(null);
  const [today, setToday] = useState(null);

  useEffect(() => {
    announcementsApi.list().then((res) => setAnnouncements(res.announcements));
    announcementsApi.today().then((res) => setToday(res.announcement)).catch(() => {});
  }, []);

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Announcements</span>
        <h1>Announcements</h1>
        <p className="sub">Updates from departments, clubs, and campus offices.</p>
      </div>

      {today && (
        <div className="section">
          <div className="pinned-notice">
            <span className="label">Today&apos;s Announcement</span>
            <h3>{today.title}</h3>
            <p>{today.description}</p>
            <div className="meta">
              {today.department} · {formatDateLong(today.date)}
            </div>
          </div>
        </div>
      )}

      <div className="section">
        {!announcements && (
          <div className="card">
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ padding: '14px 0' }}>
                <div className="skeleton" style={{ width: '50%', marginBottom: 8 }} />
                <div className="skeleton" style={{ width: '80%' }} />
              </div>
            ))}
          </div>
        )}

        {announcements && announcements.length === 0 && (
          <div className="empty-state">
            <h3>No announcements yet</h3>
            <p>Check back soon for updates from your departments and clubs.</p>
          </div>
        )}

        {announcements &&
          announcements.map((a) => (
            <div className="card" key={a._id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <h3 style={{ fontSize: 16 }}>{a.title}</h3>
                <span className={`badge badge-${a.priority === 'high' ? 'high' : 'neutral'}`}>{a.category}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{a.description}</p>
              <div className="meta" style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10 }}>
                {a.department} · {formatDateLong(a.date)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
