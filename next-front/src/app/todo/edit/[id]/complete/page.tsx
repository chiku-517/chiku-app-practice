"use client";
import Button from "@/app/components/elements/button/Button";

const page = () => {
    return (
        <div>
            <h1>TODOタスクの編集が完了しました</h1>
            <Button label="一覧へ戻る" onClick={() => window.location.href = "/todo"} />
        </div>
    );
};

export default page;
