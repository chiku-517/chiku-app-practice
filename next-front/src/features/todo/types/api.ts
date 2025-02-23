import axios from "axios";

// APIのベースURLを取得し、デフォルト値を設定
const API_URL = process.env.NEXT_PHP_API_BASE_URL
    ? `${process.env.NEXT_PHP_BASE_URL}/todos`
    : "http://localhost:8082/api/todos";

// Todoの型定義
export interface TodoData {
    id?: number;
    title?: string;
    description?: string;
    due_date?: string;
    priority?: number;
    is_completed?: boolean;
    user_id?: number;
}

// TODO一覧を取得
export const fetchTodos = async (): Promise<TodoData[]> => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("Todo一覧取得の通信失敗:", error);
        return [];
    }
};

// TODOを追加
export const addTodo = async (todo: TodoData): Promise<TodoData | void> => {
    try {
        const res = await axios.post(API_URL, todo);
        return res.data;
    } catch (error: unknown) {
        // error が AxiosError 型であるかチェック
        if (axios.isAxiosError(error)) {
            console.error("Todo登録の通信失敗:", error.response?.data);
            alert(`Todoの登録に失敗しました。エラー: ${JSON.stringify(error.response?.data)}`);
        } else {
            console.error("Todo登録の通信失敗:", error);
            alert("Todoの登録に失敗しました。通信エラーの可能性があります。");
        }
    }
};

// TODOを更新
export const updateTodo = async (id: number, updates: TodoData): Promise<void> => {
    try {
        await axios.put(`${API_URL}/${id}`, updates);
    } catch (error) {
        console.error(`Error updating todo with id ${id}:`, error);
    }
};

// TODOを削除
export const deleteTodo = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting todo with id ${id}:`, error);
    }
};
