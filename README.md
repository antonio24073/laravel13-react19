# React 19 + Laravel 19 - Project


## Requirements

- docker
- make

## Installation

```bash
mv .env.example .env
```

Open `.env` and configure the variables

```bash
make build
make mkdir
make perm
make up
```

Inside container:

```bash
npm i
php artisan migrate
php artisan make:seeder UserSeeder
php artisan passport:client --password
php artisan passport:client --personal
```

Put the client ID in your passport `.env` variables

Restart the containers:

```bash
make rm
make up
```

## Stop Application

```bash
make rm
```

To start again:

```bash
make up
```

