import { useState } from 'react'

function getInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function UserList({ users, onOpenModal }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = users.filter((u) => {
    const matchSearch = !query || 
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.company.toLowerCase().includes(query.toLowerCase())
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <section className="user-list-section">
      <div className="user-list-header">
        <h3 className="user-list-title">Utilisateurs</h3>
        <button className="btn-primary" onClick={() => onOpenModal('add')}>
          + Ajouter
        </button>
      </div>

      <div className="filter-zone">
        <div className="filter-search">
          <span className="filter-search-icon">⌕</span>
          <input
            type="text"
            placeholder="Rechercher par nom, email, société..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="filter-clear" onClick={() => setQuery('')}>✕</button>
          )}
        </div>
        <div className="filter-select-wrapper">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>
      </div>

      <div className="user-table">
        <div className="user-table-head">
          <span>Utilisateur</span>
          <span>Société</span>
          <span>Rôle</span>
          <span>Statut</span>
          <span></span>
        </div>
        {filtered.length === 0 ? (
          <div className="user-table-empty">Aucun utilisateur trouvé</div>
        ) : (
          filtered.map((user) => (
            <div key={user.id} className="user-table-row">
              <div className="user-cell-name">
                <span className="user-avatar">{getInitials(user.name)}</span>
                <div>
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
              </div>
              <span className="user-cell">{user.company}</span>
              <span className="user-cell">{user.role}</span>
              <span className="user-cell">
                <span className={`user-status ${user.status}`}>
                  {user.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </span>
              <span className="user-cell-actions">
                <button
                  className="btn-inspect"
                  onClick={() => onOpenModal('inspect', user)}
                >
                  Inspecter
                </button>
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
