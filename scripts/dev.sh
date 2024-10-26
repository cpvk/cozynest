#!/bin/sh
# One-command local run: Postgres (Docker) + API + client.
# Ctrl+C stops the API and client; the database keeps running
# (stop it with: docker compose down).
set -e
cd "$(dirname "$0")/.."

if ! docker info >/dev/null 2>&1; then
  echo "Starting Docker Desktop..."
  open -a Docker
  i=0
  while ! docker info >/dev/null 2>&1; do
    i=$((i + 1))
    if [ "$i" -gt 60 ]; then
      echo "Docker did not start in time. Open Docker Desktop, then re-run: npm run dev"
      exit 1
    fi
    sleep 2
  done
fi

echo "Starting database..."
docker compose up -d db
i=0
until docker exec cozynest-db pg_isready -U postgres -d cozynest >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -gt 30 ]; then
    echo "Database did not become ready. Check: docker compose logs db"
    exit 1
  fi
  sleep 1
done

echo "Preparing database tables and seed data..."
(cd server && npx prisma generate >/dev/null)
(cd server && npx prisma db push)
(cd server && npm run seed)

echo ""
echo "CozyNest:  http://localhost:5173"
echo "API:       http://localhost:3000"
echo "Press Ctrl+C to stop the API and client."
echo ""

npm --prefix server run dev &
SERVER_PID=$!
npm --prefix client run dev &
CLIENT_PID=$!
trap 'kill $SERVER_PID $CLIENT_PID 2>/dev/null || true' INT TERM EXIT
wait
