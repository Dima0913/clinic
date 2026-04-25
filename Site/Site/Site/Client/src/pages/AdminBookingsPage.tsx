import { useEffect, useMemo, useState } from 'react'
import { adminLogin, adminLogout, fetchAdminBookings, hasAdminSession, updateBookingStatus, type AdminBooking } from '../services/api'

const STATUS_OPTIONS = ['Scheduled', 'Confirmed', 'Completed', 'Cancelled'] as const

const statusUa: Record<string, string> = {
  Scheduled: 'Заплановано',
  Confirmed: 'Підтверджено',
  Completed: 'Завершено',
  Cancelled: 'Скасовано',
}

export default function AdminBookingsPage() {
  const [rows, setRows] = useState<AdminBooking[]>([])
  const [loading, setLoading] = useState(false)
  const [statusLoadingId, setStatusLoadingId] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [authorized, setAuthorized] = useState(hasAdminSession())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await fetchAdminBookings()
      setRows(data)
    } catch (e: any) {
      console.error(e)
      if (e?.response?.status === 401) {
        adminLogout()
        setAuthorized(false)
        alert('Сесія завершилась. Увійдіть знову.')
      } else {
        alert('Не вдалося завантажити записи.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authorized) load()
  }, [authorized])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      [r.name, r.phone, r.userEmail, r.serviceName, r.branchName, r.status].join(' ').toLowerCase().includes(q),
    )
  }, [rows, query])

  const activeRows = useMemo(
    () => filtered.filter((r) => r.status !== 'Completed' && r.status !== 'Cancelled'),
    [filtered],
  )

  const archivedRows = useMemo(
    () => filtered.filter((r) => r.status === 'Completed' || r.status === 'Cancelled'),
    [filtered],
  )

  const onChangeStatus = async (id: number, status: string) => {
    setStatusLoadingId(id)
    try {
      await updateBookingStatus(id, status)
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch (e: any) {
      console.error(e)
      if (e?.response?.status === 401) {
        adminLogout()
        setAuthorized(false)
        alert('Сесія завершилась. Увійдіть знову.')
      } else {
        alert(e?.response?.data?.message || 'Не вдалося змінити статус.')
      }
    } finally {
      setStatusLoadingId(null)
    }
  }

  return (
    <section className="nx-section nx-section--tight">
      <div className="nx-container">
        <div className="nx-section-head">
          <p className="nx-section-label">Адмінка</p>
          <h2>Записи клієнтів</h2>
          <p>Керуйте статусами: Заплановано, Підтверджено, Завершено, Скасовано.</p>
        </div>

        {!authorized ? (
          <div className="nx-panel" style={{ maxWidth: 480 }}>
            <div className="nx-field">
              <label htmlFor="adminUser">Логін</label>
              <input id="adminUser" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="nx-field">
              <label htmlFor="adminPass">Пароль</label>
              <input id="adminPass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button
              type="button"
              className="nx-btn-secondary"
              disabled={loginLoading}
              onClick={async () => {
                setLoginLoading(true)
                try {
                  await adminLogin(username.trim(), password)
                  setAuthorized(true)
                } catch (e: any) {
                  alert(e?.response?.data?.message || 'Помилка входу.')
                } finally {
                  setLoginLoading(false)
                }
              }}
            >
              {loginLoading ? 'Вхід...' : 'Увійти'}
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <button
                type="button"
                className="nx-btn-ghost"
                onClick={() => {
                  adminLogout()
                  setAuthorized(false)
                  setRows([])
                }}
              >
                Вийти
              </button>
            </div>

            <div className="nx-field" style={{ marginBottom: 16, maxWidth: 420 }}>
              <label htmlFor="searchBookings">Пошук</label>
              <input
                id="searchBookings"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ПІБ, телефон, email, послуга..."
              />
            </div>

            <h3 style={{ marginBottom: 10 }}>Поточні записи</h3>
            <div className="nx-table-wrap" style={{ marginBottom: 22 }}>
              <table className="nx-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Клієнт</th>
                    <th>Контакт</th>
                    <th>Філія / Послуга</th>
                    <th>Дата / Час</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6}>Завантаження...</td>
                    </tr>
                  ) : activeRows.length === 0 ? (
                    <tr>
                      <td colSpan={6}>Поточних записів не знайдено.</td>
                    </tr>
                  ) : (
                    activeRows.map((r) => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.name}</td>
                        <td>
                          <div>{r.phone}</div>
                          <div style={{ fontSize: 12, opacity: 0.8 }}>{r.userEmail}</div>
                        </td>
                        <td>
                          <div>{r.branchName}</div>
                          <div style={{ fontSize: 12, opacity: 0.8 }}>{r.serviceName}</div>
                        </td>
                        <td>
                          {String(r.appointmentDate).slice(0, 10)} {r.appointmentTime}
                        </td>
                        <td>
                          <select
                            value={r.status}
                            onChange={(e) => onChangeStatus(r.id, e.target.value)}
                            disabled={statusLoadingId === r.id}
                            style={{ minWidth: 150 }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {statusUa[s]}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <h3 style={{ marginBottom: 10 }}>Архів (завершені / скасовані)</h3>
            <div className="nx-table-wrap">
              <table className="nx-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Клієнт</th>
                    <th>Контакт</th>
                    <th>Філія / Послуга</th>
                    <th>Дата / Час</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6}>Завантаження...</td>
                    </tr>
                  ) : archivedRows.length === 0 ? (
                    <tr>
                      <td colSpan={6}>Архів порожній.</td>
                    </tr>
                  ) : (
                    archivedRows.map((r) => (
                      <tr key={`arch-${r.id}`}>
                        <td>{r.id}</td>
                        <td>{r.name}</td>
                        <td>
                          <div>{r.phone}</div>
                          <div style={{ fontSize: 12, opacity: 0.8 }}>{r.userEmail}</div>
                        </td>
                        <td>
                          <div>{r.branchName}</div>
                          <div style={{ fontSize: 12, opacity: 0.8 }}>{r.serviceName}</div>
                        </td>
                        <td>
                          {String(r.appointmentDate).slice(0, 10)} {r.appointmentTime}
                        </td>
                        <td>
                          <select
                            value={r.status}
                            onChange={(e) => onChangeStatus(r.id, e.target.value)}
                            disabled={statusLoadingId === r.id}
                            style={{ minWidth: 150 }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {statusUa[s]}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

