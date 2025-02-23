<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Services\TodoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;
use Exception;
use Illuminate\Validation\ValidationException;

class TodoController extends Controller
{
    private TodoService $todoService;

    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }

    // 表示用の未完了Todo一覧を取得（GET /api/todos）
    public function index(): object
    {
        try {
            $incompleteTodos = $this->todoService->getIncompleteTodos();
        } catch (\Exception $e) {
            Log::error('APIエラー: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json($incompleteTodos);
    }

    // Todoを登録（POST /api/todos）
    public function store(Request $request): object
    {
        try {
            Log::info('Todo登録リクエスト:', $request->all());

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'due_date' => 'required|date',
                'priority' => 'required|integer|min:1|max:3',
            ]);

            $todo = Todo::create($validated);
            return response()->json($todo, 201);

        } catch (ValidationException $e) {
            // バリデーションエラー
            return response()->json([
                'message' => 'バリデーションエラー',
                'errors' => $e->errors(),
            ], 422);

        } catch (Exception $e) {
            Log::error('Todo登録エラー: ' . $e->getMessage());
            return response()->json([
                'message' => 'サーバーエラーが発生しました'
            ], 500);
        }
    }

    // Todo詳細を取得（GET /api/todos/{id}）
    public function show(Todo $todo): object
    {
        try {
            return response()->json($todo);
        } catch (Exception $e) {
            Log::error('Todo取得エラー: ' . $e->getMessage());
            return response()->json([
                'message' => '指定のTodoが見つかりません'
            ], 404);
        }
    }

    // Todoを更新（PUT /api/todos/{id}）
    public function update(Request $request, Todo $todo): object
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string|max:255',
                'due_date' => 'sometimes|required|date',
                'priority' => 'sometimes|required|integer|min:1|max:3',
                'is_completed' => 'sometimes|boolean',
            ]);

            $todo->update($validated);
            return response()->json($todo);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'バリデーションエラー',
                'errors' => $e->errors(),
            ], 422);

        } catch (Exception $e) {
            Log::error('Todo更新エラー: ' . $e->getMessage());
            return response()->json([
                'message' => 'サーバーエラーが発生しました'
            ], 500);
        }
    }

    // 削除ボタンからTodoを削除（DELETE /api/todos/{id}）
    public function destroy(Todo $todo): object
    {
        try {
            $todo->delete();
            return response()->json([
                'message' => '指定のタスクを削除しました。'
            ]);
        } catch (Exception $e) {
            Log::error('Todo削除エラー: ' . $e->getMessage());
            return response()->json([
                'message' => 'サーバーエラーが発生しました'
            ], 500);
        }
    }
}
