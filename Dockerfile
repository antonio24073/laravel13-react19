FROM php:8.4-fpm-alpine

# Dependências do sistema
RUN apk add --no-cache \
    bash \
    curl \
    git \
    nodejs \
    npm \
    unzip \
    zip \
    icu \
    libzip \
    libpng \
    libjpeg-turbo \
    freetype \
    libwebp \
    oniguruma

RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    icu-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libwebp-dev \
    oniguruma-dev

# GD
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    --with-webp

# Extensões PHP
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    --with-webp \
    && docker-php-ext-install -j$(nproc) \
        bcmath \
        gd \
        intl \
        mbstring \
        opcache \
        pdo_mysql \
        zip

RUN apk del .build-deps

# Composer
RUN curl -sS https://getcomposer.org/installer | php \
    -- \
    --install-dir=/usr/local/bin \
    --filename=composer

# Configurações PHP
COPY ./.docker/*.ini /usr/local/etc/php/conf.d/

# Aplicação
WORKDIR /var/www/app

COPY . .

# Permissões do Laravel
RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data \
        storage \
        bootstrap/cache

USER www-data

EXPOSE 9000

CMD ["php-fpm"]