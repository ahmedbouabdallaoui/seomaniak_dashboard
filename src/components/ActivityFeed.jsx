const typeIcons = {
  create: '+',
  update: '↻',
  delete: '✕',
  login: '→',
}

export default function ActivityFeed({ activities }) {
  return (
    <div className="activity-feed">
      <h3 className="feed-title">Activité récente</h3>
      <div className="feed-list">
        {activities.map((item) => (
          <div key={item.id} className="feed-item">
            <span className={`feed-icon ${item.type}`}>
              {typeIcons[item.type]}
            </span>
            <div className="feed-content">
              <span className="feed-action">
                <span className="feed-user">{item.userName}</span>
                {' '}{item.action}
              </span>
              <span className="feed-detail">{item.detail}</span>
            </div>
            <span className="feed-time">{item.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
