#!/bin/sh
set -e  # エラー発生時にスクリプトを即終了

echo "Laravel コンテナのセットアップを開始します..."

# ストレージのパーミッションを設定
echo "ストレージのパーミッションを設定..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# .env がない場合はエラー
if [ ! -f "/var/www/html/.env" ]; then
    echo "エラー: .env ファイルが見つかりません。" >&2
    exit 1
fi

# データベースのマイグレーションを実行
echo "データベースのマイグレーションを実行..."
php artisan migrate --force

# Laravel のキャッシュクリア（マイグレーション後）
echo "キャッシュをクリア..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Laravel の開発サーバーを起動
echo "Laravel の開発サーバーを起動します..."
exec php artisan serve --host=0.0.0.0 --port=8000
