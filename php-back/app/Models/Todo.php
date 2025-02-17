<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Todo extends Model
{
    use HasFactory;

    // 入力が必要な項目
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'priority',
        'is_completed',
        'user_id'
    ];

    // 初期表示のための一覧取得未完了タスクの取得
    public static function getIncompleteTodos(): object|null
    {
        Log::info('一覧取得メソッド通過');
        $inCompleteTodos = self::where('is_completed', false)->get();

        return $inCompleteTodos;
    }

    // 完了タスクに完了フラグをつけて更新
    public static function maskAsCompleted(int $id): object|null
    {
        $todos = self::find($id);
        $todos->is_completed = true;
        $todos->save();

        return $todos;
    }
}
