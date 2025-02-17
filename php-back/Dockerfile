# CLI ベースの PHP 8.3 を使用
FROM php:8.3-cli

# 作業ディレクトリを設定
WORKDIR /var/www/html  # Laravel のディレクトリと統一

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    procps \
    vim \
    && docker-php-ext-install pdo pdo_pgsql

# Composer をインストール（最新の Composer をコピー）
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Laravel のアプリケーションコードをコピー
COPY . /var/www/html/

# `docker-entrypoint.sh` をコピーして適切な実行権限を付与
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && \
    chown www-data:www-data /usr/local/bin/docker-entrypoint.sh

# 権限設定（storage, cacheディレクトリ）
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Laravel の依存関係をインストール（`artisan` を確実に含める）
RUN composer install --no-dev --optimize-autoloader || true

# エントリーポイントを設定
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# `php artisan serve` をデフォルトのコマンドとして実行
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
