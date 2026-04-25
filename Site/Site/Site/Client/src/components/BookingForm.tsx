import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cancelBooking, createBooking, fetchAvailableSlots } from '../services/api'
import type { Service } from '../types'

type BookingFormProps = {
  services: Service[]
}

export default function BookingForm({ services }: BookingFormProps) {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // store last 9 digits (UA mobile) without country code
    email: '',
    serviceId: 1,
    branchId: 1,
    preferredDate: '',
    preferredTime: '09:00',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<string[] | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [lastSubmittedSlot, setLastSubmittedSlot] = useState<{ date: string; time: string } | null>(null)
  const [lastCancelToken, setLastCancelToken] = useState<string | null>(null)
  const [cancelLoading, setCancelLoading] = useState(false)
  const isSarnyBranch = parseInt(String(formData.branchId), 10) === 2
  const sarnyPhoneHref = 'tel:+380673287298'
  const sarnyPhoneLabel = '067 328 72 98'

  const todayLocal = (() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })()

  const parseIsoDate = (iso: string) => {
    // iso expected "yyyy-MM-dd"
    const [y, m, d] = iso.split('-').map((x) => parseInt(x, 10))
    if (!y || !m || !d) return null
    const out = new Date(y, m - 1, d)
    out.setHours(0, 0, 0, 0)
    return Number.isNaN(out.getTime()) ? null : out
  }

  const toIsoDate = (d: Date) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const selectedDateObj = formData.preferredDate ? parseIsoDate(formData.preferredDate) : null
  const [calView, setCalView] = useState(() => {
    const base = selectedDateObj ?? todayLocal
    return { year: base.getFullYear(), month: base.getMonth() } // month: 0-11
  })

  useEffect(() => {
    if (!selectedDateObj) return
    setCalView({ year: selectedDateObj.getFullYear(), month: selectedDateObj.getMonth() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.preferredDate])

  const monthNamesUa = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ]

  const weekdayUa = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд']

  const daysInMonth = (year: number, month0: number) => new Date(year, month0 + 1, 0).getDate()

  const firstWeekdayIndexMon0 = (year: number, month0: number) => {
    // JS: 0=Sun..6=Sat, we want 0=Mon..6=Sun
    const js = new Date(year, month0, 1).getDay()
    return (js + 6) % 7
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  const canGoPrevMonth = (() => {
    const viewFirst = new Date(calView.year, calView.month, 1)
    viewFirst.setHours(0, 0, 0, 0)
    // If the entire month is before today, we still allow navigation but disallow selecting.
    // UX: don't let users go to months strictly before the month of "today".
    const todayMonthFirst = new Date(todayLocal.getFullYear(), todayLocal.getMonth(), 1)
    todayMonthFirst.setHours(0, 0, 0, 0)
    return viewFirst.getTime() > todayMonthFirst.getTime()
  })()

  const goPrevMonth = () => {
    if (!canGoPrevMonth) return
    setCalView((prev) => {
      const m = prev.month - 1
      if (m < 0) return { year: prev.year - 1, month: 11 }
      return { year: prev.year, month: m }
    })
  }

  const goNextMonth = () => {
    setCalView((prev) => {
      const m = prev.month + 1
      if (m > 11) return { year: prev.year + 1, month: 0 }
      return { year: prev.year, month: m }
    })
  }

  const renderCalendarCells = () => {
    const total = daysInMonth(calView.year, calView.month)
    const offset = firstWeekdayIndexMon0(calView.year, calView.month)
    const cells: (Date | null)[] = []

    for (let i = 0; i < offset; i++) cells.push(null)
    for (let d = 1; d <= total; d++) {
      const dt = new Date(calView.year, calView.month, d)
      dt.setHours(0, 0, 0, 0)
      cells.push(dt)
    }
    while (cells.length % 7 !== 0) cells.push(null)

    return cells.map((dt, idx) => {
      if (!dt) return <div key={`empty-${idx}`} className="nx-cal-cell nx-cal-cell--empty" aria-hidden="true" />

      const disabled = dt.getTime() < todayLocal.getTime()
      const selected = !!selectedDateObj && isSameDay(dt, selectedDateObj)
      const isToday = isSameDay(dt, todayLocal)
      const iso = toIsoDate(dt)

      return (
        <button
          key={iso}
          type="button"
          className={[
            'nx-cal-cell',
            disabled ? 'nx-cal-cell--disabled' : '',
            selected ? 'nx-cal-cell--selected' : '',
            isToday ? 'nx-cal-cell--today' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => {
            if (disabled) return
            setFormData((prev) => ({ ...prev, preferredDate: iso }))
          }}
          disabled={disabled}
          aria-pressed={selected}
          aria-label={iso}
        >
          <div className="nx-cal-cell-day">{dt.getDate()}</div>
          <div className="nx-cal-cell-month">{monthNamesUa[dt.getMonth()].slice(0, 4).toLowerCase()}.</div>
        </button>
      )
    })
  }

  useEffect(() => {
    const serviceIdParam = searchParams.get('serviceId')
    if (serviceIdParam) {
      const n = parseInt(serviceIdParam, 10)
      if (!Number.isNaN(n) && services.some((s) => s.id === n)) {
        setFormData((prev) => ({ ...prev, serviceId: n }))
      }
    }
  }, [searchParams, services])

  useEffect(() => {
    const currentId = parseInt(String(formData.serviceId), 10)
    if (services.length && !services.some((s) => s.id === currentId)) {
      setFormData((prev) => ({ ...prev, serviceId: services[0].id }))
    }
  }, [services, formData.serviceId])

  useEffect(() => {
    const run = async () => {
      if (!formData.preferredDate) {
        setAvailableSlots(null)
        return
      }
      setSlotsLoading(true)
      try {
        const res = await fetchAvailableSlots({
          serviceId: parseInt(String(formData.serviceId), 10),
          branchId: parseInt(String(formData.branchId), 10),
          date: formData.preferredDate,
        })
        setAvailableSlots(res.availableSlots)
        if (!res.availableSlots.length) {
          setFormData((prev) => ({ ...prev, preferredTime: '' }))
        } else if (!res.availableSlots.includes(formData.preferredTime)) {
          // If currently selected time is no longer available, switch to the first free slot.
          setFormData((prev) => ({ ...prev, preferredTime: res.availableSlots[0] }))
        }
      } catch (e) {
        console.error(e)
        setAvailableSlots(null)
      } finally {
        setSlotsLoading(false)
      }
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.preferredDate, formData.branchId, formData.serviceId])

  const phoneToNineDigits = (input: string) => {
    const digits = input.replace(/\D/g, '')
    if (!digits) return ''
    // Accept: 0XXXXXXXXX, 380XXXXXXXXX, or just XXXXXXXXX
    if (digits.startsWith('380')) return digits.slice(3, 12)
    if (digits.startsWith('0')) return digits.slice(1, 10)
    return digits.slice(0, 9)
  }

  const formatUaPhoneDisplay = (nineDigits: string) => {
    // Display: 0XX XXX XX XX
    const d = nineDigits.slice(0, 9)
    const p1 = d.slice(0, 2)
    const p2 = d.slice(2, 5)
    const p3 = d.slice(5, 7)
    const p4 = d.slice(7, 9)
    let out = '0'
    if (p1) out += p1
    if (p2) out += ` ${p2}`
    if (p3) out += ` ${p3}`
    if (p4) out += ` ${p4}`
    return out
  }

  const toApiPhone = (nineDigits: string) => {
    const d = nineDigits.replace(/\D/g, '').slice(0, 9)
    return d.length ? `+380${d}` : ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: phoneToNineDigits(value) }))
      return
    }
    if (name === 'serviceId' || name === 'branchId') {
      const n = parseInt(value, 10)
      setFormData((prev) => ({ ...prev, [name]: Number.isNaN(n) ? value : n }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!services.length) return
    if (isSarnyBranch) {
      alert('У філії Сарни запис доступний тільки по телефону: 067 328 72 98.')
      return
    }
    if (!formData.preferredDate) {
      alert('Оберіть дату прийому.')
      return
    }
    if (!formData.preferredTime) {
      alert('Оберіть час прийому.')
      return
    }
    setLoading(true)
    try {
      const submittedDate = formData.preferredDate
      const submittedTime = formData.preferredTime
      const res = await createBooking({
        name: formData.name,
        phone: toApiPhone(formData.phone),
        userEmail: formData.email,
        notes: formData.notes,
        appointmentDate: formData.preferredDate,
        appointmentTime: formData.preferredTime,
        serviceId: parseInt(String(formData.serviceId), 10),
        branchId: parseInt(String(formData.branchId), 10),
      })
      setSuccess(true)
      setLastSubmittedSlot({ date: submittedDate, time: submittedTime })
      setLastCancelToken(res?.cancelToken || null)
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceId: services[0]?.id ?? 1,
        branchId: 1,
        preferredDate: '',
        preferredTime: '09:00',
        notes: '',
      })
      setTimeout(() => setSuccess(false), 6000)
    } catch (err) {
      console.error(err)
      // If slot is already taken, backend returns 409 Conflict.
      const status = (err as any)?.response?.status
      const msg = (err as any)?.response?.data?.message
      if (status === 409) {
        alert(msg || 'Цей час уже зайнятий. Оберіть інший день або час.')
      } else {
        alert('Не вдалося надіслати заявку. Спробуйте пізніше або зателефонуйте: 097 782 45 94.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!lastCancelToken) return
    const ok = window.confirm('Скасувати цей запис?')
    if (!ok) return

    setCancelLoading(true)
    try {
      await cancelBooking(lastCancelToken)
      alert('Запис скасовано.')
      setLastCancelToken(null)
      setSuccess(false)
      // refresh available slots if user is still on the form with selected date
      if (formData.preferredDate) {
        try {
          const res = await fetchAvailableSlots({
            serviceId: parseInt(String(formData.serviceId), 10),
            branchId: parseInt(String(formData.branchId), 10),
            date: formData.preferredDate,
          })
          setAvailableSlots(res.availableSlots)
        } catch {
          // ignore
        }
      }
    } catch (e) {
      console.error(e)
      alert('Не вдалося скасувати запис. Спробуйте пізніше.')
    } finally {
      setCancelLoading(false)
    }
  }

  return (
    <form id="booking" className="nx-form" onSubmit={handleSubmit}>
      {success && (
        <div className="nx-form-success" role="status">
          <div>Заявку прийнято. Ми зв’яжемося з вами для підтвердження.</div>
          {lastSubmittedSlot?.date && lastSubmittedSlot?.time && (
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
              Обрано: {lastSubmittedSlot.date} • {lastSubmittedSlot.time}
            </div>
          )}
          {lastCancelToken && (
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="nx-btn-secondary"
                onClick={handleCancel}
                disabled={cancelLoading}
                style={{ padding: '10px 16px', fontSize: 11 }}
              >
                {cancelLoading ? 'Скасування…' : 'Скасувати запис'}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="nx-field">
        <label htmlFor="name">ПІБ</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="Ваше ім’я та прізвище"
        />
      </div>

      <div className="nx-field">
        <label htmlFor="phone">Телефон</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          value={formatUaPhoneDisplay(formData.phone)}
          onChange={handleChange}
          required
          autoComplete="tel"
          placeholder="0XX XXX XX XX"
        />
      </div>

      <div className="nx-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required={!isSarnyBranch}
          autoComplete="email"
          placeholder="you@email.com"
        />
      </div>

      <div className="nx-field">
        <label htmlFor="branchId">Філія</label>
        <select id="branchId" name="branchId" value={formData.branchId} onChange={handleChange} required>
          <option value={1}>Рівне — вул. Генерала Безручка, 5а</option>
          <option value={2}>Сарни — МЦ «ВІЗІЯ», вул. Я. Мудрого, 5</option>
        </select>
      </div>

      <div className="nx-field">
        <label htmlFor="serviceId">Послуга</label>
        <select
          id="serviceId"
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          required
          disabled={!services.length}
        >
          {!services.length ? (
            <option value="">Завантаження послуг…</option>
          ) : (
            services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))
          )}
        </select>
      </div>

      {isSarnyBranch ? (
        <div className="nx-form-success" role="status">
          <div>У філії Сарни онлайн-запис недоступний.</div>
          <div style={{ marginTop: 6 }}>Запис тільки по телефону:</div>
          <div style={{ marginTop: 8 }}>
            <a href={sarnyPhoneHref} style={{ fontWeight: 700 }}>
              {sarnyPhoneLabel}
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="nx-field">
            <label htmlFor="preferredDate">Бажана дата</label>
            <div className="nx-cal" role="group" aria-label="Вибір дати">
              <div className="nx-cal-head">
                <button type="button" className="nx-cal-nav" onClick={goPrevMonth} disabled={!canGoPrevMonth} aria-label="Попередній місяць">
                  ←
                </button>
                <div className="nx-cal-title">
                  {monthNamesUa[calView.month]} {calView.year}
                </div>
                <button type="button" className="nx-cal-nav" onClick={goNextMonth} aria-label="Наступний місяць">
                  →
                </button>
              </div>

              <div className="nx-cal-week" aria-hidden="true">
                {weekdayUa.map((d) => (
                  <div key={d} className="nx-cal-weekday">
                    {d}
                  </div>
                ))}
              </div>

              <div className="nx-cal-grid">{renderCalendarCells()}</div>

              <div className="nx-cal-selected" aria-live="polite">
                {formData.preferredDate ? `Обрано: ${formData.preferredDate}` : 'Оберіть дату в календарі'}
              </div>
            </div>
          </div>

          <div className="nx-field">
            <label>Бажаний час</label>
            <div className="nx-time" role="group" aria-label="Вибір часу">
              {!formData.preferredDate ? (
                <div className="nx-time-empty">Спочатку оберіть дату</div>
              ) : slotsLoading ? (
                <div className="nx-time-empty">Завантаження часу…</div>
              ) : Array.isArray(availableSlots) ? (
                availableSlots.length ? (
                  <div className="nx-time-grid">
                    {availableSlots.map((t) => {
                      const selected = formData.preferredTime === t
                      return (
                        <button
                          key={t}
                          type="button"
                          className={['nx-time-slot', selected ? 'nx-time-slot--selected' : ''].filter(Boolean).join(' ')}
                          onClick={() => setFormData((prev) => ({ ...prev, preferredTime: t }))}
                          aria-pressed={selected}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="nx-time-empty">Немає вільного часу на цю дату</div>
                )
              ) : (
                <div className="nx-time-grid">
                  {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((t) => {
                    const selected = formData.preferredTime === t
                    return (
                      <button
                        key={t}
                        type="button"
                        className={['nx-time-slot', selected ? 'nx-time-slot--selected' : ''].filter(Boolean).join(' ')}
                        onClick={() => setFormData((prev) => ({ ...prev, preferredTime: t }))}
                        aria-pressed={selected}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="nx-field">
        <label htmlFor="notes">Коментар (необов’язково)</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Коротко опишіть звернення або побажання щодо прийому…"
        />
      </div>

      <button type="submit" className="nx-btn-primary" style={{ width: '100%' }} disabled={loading || !services.length || isSarnyBranch}>
        {loading ? 'Надсилання…' : 'Надіслати заявку'}
      </button>
    </form>
  )
}
