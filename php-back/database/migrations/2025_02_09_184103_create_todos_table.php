<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id(); // TodoID（自動採番）
            $table->string('title', 255)->nullable(); // タイトル（必須）
            $table->text('description')->nullable(); // 説明（必須）
            $table->date('due_date')->nullable(); // 期日（必須）
            $table->integer('priority')->nullable(); // 優先度（必須）
            $table->boolean('is_completed')->default(false); // 完了フラグ（デフォルト未完了）
            $table->unsignedBigInteger('user_id')->nullable(); // ユーザID（後でログイン機能追加）
            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
