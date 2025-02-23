<?php

namespace App\Services;

use App\Models\Todo;
use Illuminate\Support\Facades\Log;

class TodoService
{
    // 未完了のTodo一覧を取得し、priorityを調整
    public function getIncompleteTodos(): object|null
    {
        $inCompleteTodos = Todo::where('is_completed', false)->get();

        if (!empty($inCompleteTodos)) {
            $inCompleteTodos = self::convertPriority($inCompleteTodos);
        }

        return $inCompleteTodos;
    }

    // 優先度の文字列への変換
    private function convertPriority(object &$todos): object
    {
        foreach ($todos as $todo) {
            switch ($todo->priority) {
                case 1:
                    $todo->priority = '低';
                    break;
                case 2:
                    $todo->priority = '中';
                    break;
                case 3:
                    $todo->priority = '高';
                    break;
                default:
                    break;
            }
        }
        return $todos;
    }

    // タスクを完了にする
    public function markAsCompleted(int $id): object|null
    {
        $todo = Todo::find($id);
        if ($todo) {
            $todo->is_completed = true;
            $todo->save();
        }

        return $todo;
    }
}
