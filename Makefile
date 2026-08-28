include ./.env
export

build:
	- docker build -t ${REPO} .

up:
	- docker compose up -d

rm:
	- docker compose down

perm:
	- sudo find . -type d -exec chmod 775 {} \;
	- sudo find . -type f -exec chmod 664 {} \;
	- sudo chown -R $$USER:82 .
	- sudo chmod +x node_modules/.bin/vite

npm_i:
	- docker compose exec -u 82 lr_app npm i

npm_run_dev:
	- docker compose exec -u 82 lr_app npm run dev