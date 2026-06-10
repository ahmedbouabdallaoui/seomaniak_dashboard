export default function StatsCards({ users }) {
  const total = users.length
  const active = users.filter((u) => u.status === 'active').length
  const inactive = users.filter((u) => u.status === 'inactive').length

  const items = [
    { label: 'Utilisateurs', value: String(total) },
    { label: 'Actifs', value: String(active) },
    { label: 'Inactifs', value: String(inactive) },
  ]

  return (
    <div className="stats-grid">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="stat-card"
          style={{ '--i': i }}
        >
          <span className="stat-label">{item.label}</span>
          <div className="stat-value-row">
            <span className="stat-value">{item.value}</span>
          </div>
          <div className="stat-bar">
            <div
              className="stat-bar-fill"
              style={{
                width: `${total ? (Number(item.value) / total) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
