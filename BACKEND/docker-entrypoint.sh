#!/bin/sh
set -e

# Railway expone las credenciales MySQL como MYSQL*, pero Laravel lee DB_*.
# Mapeamos solo si no se definieron explícitamente DB_*.
export DB_CONNECTION="${DB_CONNECTION:-mysql}"
export DB_HOST="${DB_HOST:-$MYSQLHOST}"
export DB_PORT="${DB_PORT:-$MYSQLPORT}"
export DB_DATABASE="${DB_DATABASE:-$MYSQLDATABASE}"
export DB_USERNAME="${DB_USERNAME:-$MYSQLUSER}"
export DB_PASSWORD="${DB_PASSWORD:-$MYSQLPASSWORD}"

echo "DB_HOST=$DB_HOST DB_PORT=$DB_PORT DB_DATABASE=$DB_DATABASE DB_USERNAME=$DB_USERNAME"

php artisan config:clear || true
php artisan migrate --force
php artisan db:seed --force
exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
