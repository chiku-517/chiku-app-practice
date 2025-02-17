"use client";
import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo, TodoData } from "@/features/todo/types/api";
import Button from "@/app/components/elements/button/Button";
import { useRouter } from "next/navigation";

const TodoListPage = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError("TODOの取得に失敗しました");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const handleDelete = async (id?: number) => {
    if (id === undefined) return; // id が undefined の場合は処理をスキップ

    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(`TODOの削除に失敗しました (ID: ${id})`);
      console.error(err);
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>TODOリスト</h1>
      <Button label="新規作成" onClick={() => router.push("/todo/create")} />

      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id ?? "unknown"}>
              <p>
                {todo.title || "（タイトルなし）"}（
                {todo.due_date ? todo.due_date : "未設定"} - 優先度{" "}
                {todo.priority ?? "未設定"}）
              </p>
              {todo.id !== undefined && (
                <>
                  <Button label="編集" onClick={() => router.push(`/todo/edit/${todo.id}`)} />
                  <Button label="削除" onClick={() => handleDelete(todo.id)} />
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>TODOはまだありません</p>
      )}
    </div>
  );
};

export default TodoListPage;
