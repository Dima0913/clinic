import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cancelBooking } from '../services/api'

export default function CancelBookingPage() {
  const [searchParams] = useSearchParams()
  const tokenFromUrl = useMemo(() => searchParams.get('token') ?? '', [searchParams])
  const [token, setToken] = useState(tokenFromUrl)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string>('')

  const onCancel = async () => {
    if (!token.trim()) {
      setMessage('Немає токена скасування.')
      return
    }
    setLoading(true)
    try {
      const res = await cancelBooking(token.trim())
      setMessage(res?.message || 'Запис скасовано.')
    } catch (e: any) {
      setMessage(e?.response?.data?.message || 'Не вдалося скасувати запис.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="nx-section nx-section--tight">
      <div className="nx-container" style={{ maxWidth: 720 }}>
        <div className="nx-section-head">
          <p className="nx-section-label">Скасування запису</p>
          <h2>Скасувати запис</h2>
          <p>Натисніть кнопку нижче, щоб скасувати ваш запис.</p>
        </div>

        <div className="nx-panel">
          <div className="nx-field">
            <label htmlFor="cancelToken">Токен скасування</label>
            <input id="cancelToken" value={token} onChange={(e) => setToken(e.target.value)} />
          </div>
          <button type="button" className="nx-btn-secondary" onClick={onCancel} disabled={loading}>
            {loading ? 'Скасування...' : 'Скасувати запис'}
          </button>
          {message && <div className="nx-form-success" style={{ marginTop: 14 }}>{message}</div>}
        </div>
      </div>
    </section>
  )
}

