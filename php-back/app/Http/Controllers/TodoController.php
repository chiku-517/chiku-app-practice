<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TodoController extends Controller
{
    // Todo一覧を取得（GET /api/todos）
    public function index()
    {
        try {
            $incompleteTodos = Todo::getIncompleteTodos();
        } catch (\Exception $e) {
            Log::error('APIエラー: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json($incompleteTodos);
    }

    // Todoを登録（POST /api/todos）
    public function store(Request $request)
    {
        Log::info($request);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'due_date' => 'required|date',
            'priority' => 'required|integer|min:1|max:3',
        ]);

        $todo = Todo::create($validated);
        return response()->json($todo, 201);
    }

    // Todo詳細を取得（GET /api/todos/{id}）
    public function show(Todo $todo)
    {
        return response()->json($todo);
    }

    // Todoを更新（PUT /api/todos/{id}）
    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:255',
            'due_date' => 'sometimes|required|date',
            'priority' => 'sometimes|required|integer|min:1|max:3',
            'is_completed' => 'sometimes|boolean',
        ]);

        $todo->update($validated);
        return response()->json($todo);
    }

    // 削除ボタンからTodoを削除（DELETE /api/todos/{id}）
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json(['message' => '指定のタスクを削除しました。']);
    }
}
