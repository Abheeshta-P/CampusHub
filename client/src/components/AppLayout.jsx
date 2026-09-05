import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { IconDashboard, IconCalendar, IconClipboard, IconNote, IconUser } from './icons.jsx';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: IconDashboard },
  { to: '/events', label: 'Events', icon: IconCalendar },
  { to: '/assignments', label: 'Assignments', icon: IconClipboard },
  { to: '/events', label: 'My Notes', icon: IconNote },
  { to: '/profile', label: 'Profile', icon: IconUser },
];


function initials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">CH</div>
          <div className="brand-name">CampusHub</div>
        </div>
        <nav>
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="user-card">
          <div className="user-avatar" style={{ background: user?.avatarColor || '#C08A2E' }}>
            {initials(user?.name)}
          </div>
          <div className="user-meta">
            <div className="user-name">{user?.name}</div>
            <div className="user-id">{user?.studentId}</div>
          </div>
        </div>
        <button type="button" className="logout-btn" onClick={logout}>
          Sign out
        </button>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark" style={{ width: 26, height: 26, fontSize: 12 }}>
              CH
            </div>
            CampusHub
          </div>
          <button type="button" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <button type="button" className="logout-btn" onClick={logout} style={{ marginTop: 6 }}>
            Sign out
          </button>
        </div>

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
