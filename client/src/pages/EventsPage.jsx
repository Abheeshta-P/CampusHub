import { useEffect, useState } from 'react';
import { eventsApi } from '../api/index.js';
import { formatDateLong } from '../utils/format.js';

export default function EventsPage() {
  const [events, setEvents] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    eventsApi.list().then((res) => setEvents(res.events));
  }, []);

  const visibleEvents = events ? events.filter((ev) => !ev.cancelled) : null;

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Events</span>
        <h1>Campus Events</h1>
        <p className="sub">
          {visibleEvents ? `${visibleEvents.length} events happening soon.` : 'Talks, workshops, and placement activities happening soon.'}
        </p>
      </div>

      <div className="card-grid">
        {!events &&
          [1, 2, 3, 4].map((i) => (
            <div className="card" key={i}>
              <div className="skeleton" style={{ width: '70%', marginBottom: 10 }} />
              <div className="skeleton" style={{ width: '40%' }} />
            </div>
          ))}

        {visibleEvents &&
          visibleEvents.map((ev) => (
            <div className="card" key={ev._id} style={{ cursor: 'pointer' }} onClick={() => setSelected(ev)}>
              <span className="badge badge-accent" style={{ marginBottom: 10 }}>
                {ev.type}
              </span>
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>{ev.title}</h3>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {formatDateLong(ev.date)} · {ev.time}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{ev.location}</div>
            </div>
          ))}
      </div>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
            <button className="overlay-close" onClick={() => setSelected(null)} aria-label="Close">
              ✕
            </button>
            <span className="badge badge-accent" style={{ marginBottom: 12 }}>
              {selected.type}
            </span>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>{selected.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
              {selected.description}
            </p>
            <div style={{ fontSize: 13.5, lineHeight: 2 }}>
              <div>
                <strong>Date:</strong> {formatDateLong(selected.date)}
              </div>
              <div>
                <strong>Time:</strong> {selected.time}
              </div>
              <div>
                <strong>Location:</strong> {selected.location}
              </div>
              <div>
                <strong>Organizer:</strong> {selected.organizer}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
