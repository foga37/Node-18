# Бібліотека фільмів

## Локальний запуск

### Backend

1. Створіть PostgreSQL базу, виконайте міграцію:

```bash
psql -d DATABASE_URL=postgresql://yaroslav_ramm_user:9IvFX9s9JRQkN3zIx7SCMN9WmA26jRD9@dpg-d1bhaqer433s739k3t80-a.frankfurt-postgres.render.com/yaroslav_ramm
PORT=5000 -f migrations/001_create_movies_table.sql
