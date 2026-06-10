import { useState } from 'react'
import { initialUsers, initialActivities } from './data/users'
import DashboardHeader from './components/DashboardHeader'
import StatsCards from './components/StatsCards'
import UserList from './components/UserList'
import UserModal from './components/UserModal'
import ConfirmDialog from './components/ConfirmDialog'
import ActivityFeed from './components/ActivityFeed'
import './App.css'

let nextId = 7
let nextActId = 7

export default function App() {
  const [users, setUsers] = useState(initialUsers)
  const [activities, setActivities] = useState(initialActivities)
  const [modalMode, setModalMode] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [confirmTarget, setConfirmTarget] = useState(null)

  function openModal(mode, user) {
    setSelectedUser(user ?? null)
    setModalMode(mode)
  }

  function closeModal() {
    setModalMode(null)
    setSelectedUser(null)
  }

  function handleSave(data) {
    if (modalMode === 'add') {
      const user = {
        id: `USR-${String(nextId++).padStart(3, '0')}`,
        name: data.name ?? '',
        email: data.email ?? '',
        company: data.company ?? '',
        role: data.role ?? '',
        status: data.status ?? 'active',
        joined: new Date().toISOString().slice(0, 10),
      }
      setUsers((prev) => [user, ...prev])
      setActivities((prev) => [{
        id: `A${nextActId++}`,
        userName: user.name,
        action: 'Ajout utilisateur',
        detail: `${user.role}`,
        timestamp: 'À l\'instant',
        type: 'create',
      }, ...prev])
      closeModal()
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser?.id ? { ...u, ...data } : u
        )
      )
      setActivities((prev) => [{
        id: `A${nextActId++}`,
        userName: data.name ?? selectedUser?.name ?? '',
        action: 'Modification profil',
        detail: `Mise à jour — ${data.role ?? selectedUser?.role}`,
        timestamp: 'À l\'instant',
        type: 'update',
      }, ...prev])
      closeModal()
    }
  }

  function handleEdit(user) {
    setSelectedUser(user)
    setModalMode('edit')
  }

  function requestDelete(user) {
    setConfirmTarget(user)
  }

  function confirmDelete() {
    if (!confirmTarget) return
    handleDelete(confirmTarget)
    setConfirmTarget(null)
  }

  function handleDelete(user) {
    setUsers((prev) => prev.filter((u) => u.id !== user.id))
    setActivities((prev) => [{
      id: `A${nextActId++}`,
      userName: user.name,
      action: 'Suppression utilisateur',
      detail: `Compte supprimé — ${user.role}`,
      timestamp: 'À l\'instant',
      type: 'delete',
    }, ...prev])
    closeModal()
  }

  return (
    <div className="app-layout">
      <main className="main-content">
        <DashboardHeader />
        <StatsCards users={users} />
        <section className="content-panel">
          <UserList users={users} onOpenModal={openModal} />
          <ActivityFeed activities={activities} />
        </section>
      </main>
      <UserModal
        mode={modalMode}
        user={selectedUser}
        onClose={closeModal}
        onSave={handleSave}
        onEdit={handleEdit}
        onRequestDelete={requestDelete}
      />
      {confirmTarget && (
        <ConfirmDialog
          userName={confirmTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
    </div>
  )
}
