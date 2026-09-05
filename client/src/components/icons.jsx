// Small, dependency-free line icons used in the sidebar/nav.
const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function IconDashboard(props) {
  return (
    <svg viewBox="0 0 24 24" className="nav-icon" {...common} {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

export function IconMegaphone(props) {
  return (
    <svg viewBox="0 0 24 24" className="nav-icon" {...common} {...props}>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l1 5h2l-1-5h2l8 4V6l-8 4H6a2 2 0 0 0-2 2z" />
    </svg>
  );
}

export function IconCalendar(props) {
  return (
    <svg viewBox="0 0 24 24" className="nav-icon" {...common} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconClipboard(props) {
  return (
    <svg viewBox="0 0 24 24" className="nav-icon" {...common} {...props}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  );
}

export function IconNote(props) {
  return (
    <svg viewBox="0 0 24 24" className="nav-icon" {...common} {...props}>
      <path d="M5 3h10l4 4v14H5z" />
      <path d="M15 3v4h4M8 12h8M8 16h5" />
    </svg>
  );
}

export function IconUser(props) {
  return (
    <svg viewBox="0 0 24 24" className="nav-icon" {...common} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}
