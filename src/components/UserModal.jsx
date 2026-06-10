import { useState, useEffect } from 'react'

const emptyForm = { name: '', email: '', company: '', role: '', status: 'active' }

export default function UserModal({ mode, user, onClose, onSave, onEdit, onRequestDelete }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (mode === 'edit' || mode === 'inspect') {
      setForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        company: user?.company ?? '',
        role: user?.role ?? '',
        status: user?.status ?? 'active',
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [mode, user])

  if (!mode) return null

  const isInspect = mode === 'inspect'
  const isAdd = mode === 'add'
  const title = isAdd ? 'Ajouter un utilisateur' : isInspect ? 'Détails utilisateur' : 'Modifier l\'utilisateur'

  function validate(data) {
    const errs = {}
    if (!data.name.trim()) errs.name = 'Le nom est requis'
    if (!data.email.trim()) {
      errs.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Email invalide'
    }
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length > 0) return
    onSave(form)
  }

  function handleDelete() {
    if (!user) return
    onRequestDelete(user)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {isInspect ? (
          <div className="inspect-body">
            <div className="inspect-avatar">
              {user?.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <dl className="inspect-grid">
              <div><dt>Nom</dt><dd>{user?.name}</dd></div>
              <div><dt>Email</dt><dd>{user?.email}</dd></div>
              <div><dt>Société</dt><dd>{user?.company}</dd></div>
              <div><dt>Rôle</dt><dd>{user?.role}</dd></div>
              <div>
                <dt>Statut</dt>
                <dd>
                  <span className={`user-status ${user?.status}`}>
                    {user?.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </dd>
              </div>
              <div><dt>Membre depuis</dt><dd>{user?.joined}</dd></div>
            </dl>
            <div className="inspect-actions">
              <button className="btn-primary" onClick={() => user && onEdit(user)}>
                Modifier
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                Supprimer
              </button>
            </div>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="m-name">Nom complet</label>
                <input id="m-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Votre nom" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="m-email">Email</label>
                <input id="m-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@exemple.com" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="m-company">Société</label>
                <input id="m-company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Société" />
              </div>
              <div className="form-group">
                <label htmlFor="m-role">Rôle</label>
                <input id="m-role" name="role" type="text" value={form.role} onChange={handleChange} placeholder="Rôle" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="m-status">Statut</label>
              <select id="m-status" name="status" value={form.status} onChange={handleChange}>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {isAdd ? 'Ajouter' : 'Enregistrer'}
              </button>
              <button type="button" className="btn-ghost" onClick={onClose}>
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
