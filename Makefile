include ./.env
export

build:
	- docker build -t ${REPO} .

up:
	- docker compose up -d

rm:
	- docker compose down

mkdir:
	- mkdir -p ./data/mariadb

perm:
	- sudo find . -type d -exec chmod 775 {} \;
	- sudo find . -type f -exec chmod 664 {} \;
	- sudo chown -R $$USER:82 .
	- sudo chmod +x node_modules/.bin/vite
	- sudo chmod 660 storage/oauth-private.key
	- sudo chmod 660 storage/oauth-public.key
	- docker compose exec lr_database chown -R mysql:mysql /var/lib/mysql

perm_db:
	- sudo chown -R 999:999 data/mariadb
	- sudo chmod 750 data/mariadb


artisan_migrate:
	- docker compose exec -u 82 lr_app php artisan migrate

npm_i:
	- docker compose exec -u 82 lr_app npm i

npm_run_dev:
	docker compose exec -u 82 lr_app npm run dev

npm_run_build:
	docker compose exec -u 82 lr_app npm run build

npm_run_typecheck:
	docker compose exec -u 82 lr_app npm run typecheck

clear_cache:
	docker compose exec -u 82 lr_app rm -rf node_modules/.vite
	docker compose exec lr_app php artisan optimize:clear
	docker compose exec lr_app composer dump-autoload