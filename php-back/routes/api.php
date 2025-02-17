<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

// 検証用ログ
Log::error('エラーテスト: API が動いているか確認');

Route::apiResource('todos', TodoController::class);
