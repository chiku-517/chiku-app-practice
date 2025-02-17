"use client";
import { useState } from "react";
import InputField from "@/app/components/elements/input/Input";
import Button from "@/app/components/elements/button/Button";

type TodoFormProps = {
  initialData?: { title: string; description: string; due_date: string; priority: number };
  onSubmit: (data: { title: string; description: string; due_date: string; priority: number }) => void;
  onCancel: () => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [due_date, setDueDate] = useState(initialData?.due_date || "");
  const [priority, setPriority] = useState(initialData?.priority || 1);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, description, due_date, priority });
  };

  return (
    <div className="todo-form">
      <InputField label="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
      <InputField label="説明" value={description} onChange={(e) => setDescription(e.target.value)} />
      <InputField label="期日" type="date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
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
      <Button label="保存" onClick={handleSubmit} />
      <Button label="キャンセル" onClick={onCancel} />
    </div>
  );
};

export default TodoForm;
