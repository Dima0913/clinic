# Медичний Центр "ЖИТТЯ" - React + C# ASP.NET Core

Професійний вебсайт для медичного центру з React frontend та C# ASP.NET Core backend.

## Структура проекту

```
Site/
├── Client/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/        # React компоненти
│   │   ├── services/          # API методи
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── Server/                    # C# ASP.NET Core backend
    ├── Controllers/           # API контролери
    ├── Models/               # Дані моделі
    ├── Data/                 # Entity Framework контекст
    ├── Services/             # Бізнес логіка та репозиторії
    ├── Program.cs
    ├── appsettings.json
    └── MedicalClinic.csproj
```

## Інсталяція та запуск

### Backend (C# ASP.NET Core)

```bash
cd Server

# Встановити залежності
dotnet restore

# Запустити міграції (якщо необхідно)
dotnet ef database update

# Запустити сервер (HTTPS на порту 7095)
dotnet run
```

Сервер буде доступний на: `https://localhost:7095`

### Frontend (React)

```bash
cd Client

# Встановити залежності
npm install

# Запустити dev сервер (порт 3000)
npm run dev

# Побудова для production
npm run build
```

Сайт буде доступний на: `http://localhost:3000`

## API Endpoints

### Послуги (Services)
- `GET /api/services` - Отримати всі послуги
- `GET /api/services/{id}` - Отримати послугу за ID
- `POST /api/services` - Створити нову послугу
- `PUT /api/services/{id}` - Оновити послугу
- `DELETE /api/services/{id}` - Видалити послугу

### Запис на прийом (Bookings)
- `GET /api/bookings` - Отримати всі записи
- `GET /api/bookings/{id}` - Отримати запис за ID
- `POST /api/bookings` - Створити новий запис
- `DELETE /api/bookings/{id}` - Видалити запис

## Налаштування

### База даних

Змініть connection string в `Server/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=MedicalClinic;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

### CORS

CORS налаштовано в `Server/Program.cs` для:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite default port)

## Технолгії

### Frontend
- React 18.2
- TypeScript
- Vite (build tool)
- Axios (HTTP клієнт)

### Backend
- .NET 8.0
- ASP.NET Core
- Entity Framework Core (ORM)
- SQL Server

## Функціональність

- ✅ Список всіх послуг з ціноюю
- ✅ Прайс-лист з інформацією про знижки
- ✅ Форма для запису на прийом
- ✅ Інформація про клініку та лікаря
- ✅ Контактна інформація та карта
- ✅ Інформація про філії
- ✅ Адаптивний дизайн
- ✅ REST API для управління послугами та записами

## Розробка

Під час розробки:
1. Frontend автоматично переводить запити на backend через проксі (див. vite.config.ts)
2. Backend запущений на окремому HTTPS порту
3. CORS дозволяє спілкування між фронт та бак

## Контакти клініки

- **Місцезнаходження:** вул. Генерала Безручка, 5а, Рівне
- **Телефон:** 0977824594
- **Email:** savichoo80@gmail.com
- **Instagram:** @dr.oleksii.savych_flebolog

---

Made by WEBDEV&SEO
