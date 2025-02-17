"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "@/features/todo/types/api";
import Button from "@/app/components/elements/button/Button";
import InputField from "@/app/components/elements/input/Input";

const TodoCreatePage = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [due_date, setdue_date] = useState("");
    const [priority, setPriority] = useState(1);

    const handleCreate = async () => {
        if (!title.trim() || !description.trim() || !due_date.trim()) return;

        await addTodo({
            title,
            description,
            due_date,
            priority,
            user_id: 1 // 仮のユーザID、後でログイン機能と連携
        });

        router.push("/todo/create/complete");
    };

    return (
        <div>
            <h1>TODOを追加</h1>
            <InputField label="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
            <InputField label="説明" value={description} onChange={(e) => setDescription(e.target.value)} />
            <InputField label="期日" type="date" value={due_date} onChange={(e) => setdue_date(e.target.value)} />
            <InputField
                label="優先度"
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                options={[
                    { value: 1, label: "低" },
                    { value: 2, label: "中" },
                    { value: 3, label: "高" },
                ]}
            />
            <Button label="登録" onClick={handleCreate} />
            <Button label="一覧へ戻る" onClick={() => router.push("/todo")} />
        </div>
    );
};

export default TodoCreatePage;
