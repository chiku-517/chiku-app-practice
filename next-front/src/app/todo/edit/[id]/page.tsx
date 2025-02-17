"use client";
import { useState, useEffect } from "react";
import { fetchTodos, updateTodo, TodoData } from "@/features/todo/types/api";
import Button from "@/app/components/elements/button/Button";
import InputField from "@/app/components/elements/input/Input";
import { useRouter } from "next/navigation";

const TodoEditPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [todo, setTodo] = useState<Partial<TodoData> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const todos = await fetchTodos();
                const selectedTodo = todos.find((t) => t.id === Number(params.id));
                if (selectedTodo) {
                    setTodo(selectedTodo);
                } else {
                    setError("TODOが見つかりません");
                }
            } catch (err) {
                setError("データの取得に失敗しました");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTodo();
    }, [params.id]);

    const handleUpdate = async () => {
        if (!todo) return;
        if (!todo.title?.trim() || !todo.description?.trim() || !todo.due_date?.trim()) {
            setError("すべての項目を入力してください");
            return;
        }

        try {
            await updateTodo(Number(params.id), {
                title: todo.title,
                description: todo.description,
                due_date: todo.due_date,
                priority: todo.priority,
            });
            await router.push(`/todo/edit/${todo.id}/complete`);
        } catch (err) {
            setError("更新に失敗しました");
            console.error(err);
        }
    };

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>TODOを編集</h1>
            <InputField
                label="タイトル"
                value={todo?.title || ""}
                onChange={(e) => setTodo((prevTodo) => ({ ...(prevTodo ?? {}), title: e.target.value }))}
            />
            <InputField
                label="説明"
                value={todo?.description || ""}
                onChange={(e) => setTodo((prevTodo) => ({ ...(prevTodo ?? {}), description: e.target.value }))}
            />
            <InputField
                label="期日"
                type="date"
                value={todo?.due_date || ""}
                onChange={(e) => setTodo((prevTodo) => ({ ...(prevTodo ?? {}), due_date: e.target.value }))}
            />

            <label>優先度</label>
            <select
                value={todo?.priority || 1}
                onChange={(e) => setTodo((prevTodo) => ({ ...(prevTodo ?? {}), priority: Number(e.target.value) }))}
            >
                <option value={1}>低</option>
                <option value={2}>中</option>
                <option value={3}>高</option>
            </select>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Button label="更新" onClick={handleUpdate} />
            <Button label="一覧へ戻る" onClick={() => router.push("/todo")} />
        </div>
    );
};

export default TodoEditPage;
