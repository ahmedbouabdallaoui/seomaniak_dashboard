const hour = new Date().getHours()
const greeting = hour < 12 ? 'Sabah el khir' : hour < 18 ? 'Masa el khir' : 'Masa el khir'

export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="header-greeting">
          {greeting}, <span className="header-name">Admin</span>
        </h1>
        <p className="header-sub">Gestion des utilisateurs</p>
      </div>
      <div className="header-right">
        <div className="header-date">
          <span className="header-date-day">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long' })}
          </span>
          <span className="header-date-full">
            {new Date().toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </header>
  )
}
