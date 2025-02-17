<?php

// bootstrap/app.php に CORS ミドルウェアを追加だけではCORS設定できないようなので、新規追加
return [
    'paths' => ['api/*'], // API のみ CORS を許可
    'allowed_methods' => ['*'], // すべての HTTP メソッドを許可
    'allowed_origins' => ['*'], // すべてのオリジンを許可（必要に応じて制限）
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // すべてのヘッダーを許可
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // 認証情報の送信を許可する場合は `true`
];
