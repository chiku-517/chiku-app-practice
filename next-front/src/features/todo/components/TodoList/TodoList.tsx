"use client";

import { useEffect, useState } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo, TodoData } from "@/features/todo/types/api";
import Button from "@/app/components/elements/button/Button";

const TodoList = () => {
    const [todos, setTodos] = useState<TodoData[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [error, setError] = useState("");

    // 初回マウント時にタスク一覧を取得
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await fetchTodos();
                setTodos(data);
            } catch (err) {
                setError("タスクの取得に失敗しました");
                console.error(err);
            }
        };
        loadTodos();
    }, []);

    // 新しいタスクを追加
    const handleAddTodo = async () => {
        if (!newTodo.trim()) return;
        try {
            const todo = await addTodo({ title: newTodo, is_completed: false });
            if (todo) {
                setTodos([...todos, todo]);
                setNewTodo("");
            }
        } catch (error) {
            setError("タスクの追加に失敗しました");
            console.error(error);
        }
    };

    // タスクの完了状態を切り替え
    const handleToggleComplete = async (id?: number, completed?: boolean) => {
        if (id === undefined) return; // `id` が `undefined` の場合は処理をスキップ
        try {
            await updateTodo(id, { is_completed: completed ?? false });
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
            );
        } catch (error) {
            setError(`タスクの更新に失敗しました (ID: ${id})`);
            console.error(error);
        }
    };

    // タスクを削除
    const handleDelete = async (id?: number) => {
        if (id === undefined) return; // `id` が `undefined` の場合は処理をスキップ
        try {
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            setError(`タスクの削除に失敗しました (ID: ${id})`);
            console.error(error);
        }
    };

    return (
        <div>
            <h1>TODOリスト</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新しいタスクを追加"
            />
            <Button label="追加" onClick={handleAddTodo} />

            <ul>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <li key={todo.id ?? "unknown"}>
                            <span style={{ textDecoration: todo.is_completed ? "line-through" : "none" }}>
                                {todo.title ?? "（タイトルなし）"}
                            </span>
                            {todo.id !== undefined && (
                                <>
                                    <Button
                                        label={todo.is_completed ? "未完了にする" : "完了"}
                                        onClick={() => handleToggleComplete(todo.id, !todo.is_completed)}
                                    />
                                    <Button label="削除" onClick={() => handleDelete(todo.id)} />
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>タスクはまだありません</p>
                )}
            </ul>
        </div>
    );
};

export default TodoList;
