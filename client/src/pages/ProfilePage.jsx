import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { authApi, profileApi } from '../api/index.js';
import CopyStudentId from '../components/CopyStudentId.jsx';

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();


  const [profile, setProfile] = useState(null);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ phone: '', skillsText: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    authApi.me().then(({ user }) => {
      setProfile(user);
      setForm({ phone: user.phone || '', skillsText: (user.skills || []).join(', ') });
    });
  }, []);

  function startEditing() {
    setForm({ phone: profile.phone || '', skillsText: (profile.skills || []).join(', ') });
    setEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const skills = form.skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const { user: updatedUser } = await profileApi.update({
        phoneNumber: form.phone,
        skills,
      });
      const optimistic = { ...profile, phone: form.phone, skills: updatedUser.skills };
      setProfile(optimistic);
      updateUser(optimistic);
      setEditing(false);
      showToast('Profile updated successfully.', 'success');
    } catch (err) {

      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }

  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Profile</span>
        <h1>My Profile</h1>
        <p className="sub">Your student record on file with CampusHub.</p>
      </div>

      <div className="card">
        <div className="profile-header">
          <div className="profile-avatar" style={{ background: profile?.avatarColor || 'var(--ink)' }}>
            {initials(profile?.name || user?.name)}
          </div>
          <div>
            <h2 style={{ fontSize: 20 }}>{profile?.name || 'Loading profile…'}</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: 13.5, marginTop: 2 }}>
              {profile ? `${profile.department} · ${profile.year}` : 'Student Record'}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <CopyStudentId studentId={profile?.studentId} />
          </div>
        </div>

        {!profile ? (
          <div style={{ padding: '16px 0' }}>
            <div className="skeleton" style={{ width: '40%', marginBottom: 12 }} />
            <div className="skeleton" style={{ width: '70%', marginBottom: 12 }} />
            <div className="skeleton" style={{ width: '50%' }} />
          </div>
        ) : !editing ? (
          <div>
            <div className="field">
              <label>Student ID</label>
              <input value={profile.studentId} disabled />
            </div>
            <div className="field">
              <label>Email</label>
              <input value={profile.email} disabled />
            </div>
            <div className="field">
              <label>Phone</label>
              <input value={profile.phone || '—'} disabled />
            </div>
            <div className="field">
              <label>Skills &amp; Interests</label>
              <div className="skills-list">
                {(profile.skills || []).length === 0 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>No skills added yet.</span>
                )}
                {(profile.skills || []).map((s, idx) => (
                  <span key={`${s}-${idx}`} className="badge badge-neutral">
                    {s}
                  </span>
                ))}

              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={startEditing}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div className="field">
              <label htmlFor="skills">Skills &amp; Interests (comma separated)</label>
              <input
                id="skills"
                value={form.skillsText}
                onChange={(e) => setForm((f) => ({ ...f, skillsText: e.target.value }))}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

