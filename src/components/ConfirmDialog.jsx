export default function ConfirmDialog({ userName, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">⚠</div>
        <h3 className="confirm-title">Confirmer la suppression</h3>
        <p className="confirm-message">
          Êtes-vous sûr de vouloir supprimer <strong>{userName}</strong> ?
          Cette action est irréversible.
        </p>
        <div className="confirm-actions">
          <button className="btn-ghost" onClick={onCancel}>
            Annuler
          </button>
          <button className="btn-danger confirm-btn" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
