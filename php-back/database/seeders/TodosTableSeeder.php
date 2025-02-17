<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $todos = [
            [
                'title' => 'Laravelの学習',
                'description' => 'Laravelの基礎を学ぶ',
                'due_date' => Carbon::now()->addDays(7),
                'priority' => 1,
                'is_completed' => false,
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Dockerの設定',
                'description' => 'Docker環境を整える',
                'due_date' => Carbon::now()->addDays(3),
                'priority' => 2,
                'is_completed' => false,
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Next.jsの開発',
                'description' => 'フロントエンドの実装を進める',
                'due_date' => Carbon::now()->addDays(5),
                'priority' => 3,
                'is_completed' => false,
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'APIテスト',
                'description' => 'Laravel APIの動作確認をする',
                'due_date' => Carbon::now()->addDays(2),
                'priority' => 1,
                'is_completed' => true,
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'コードレビュー',
                'description' => 'チームのコードをレビューする',
                'due_date' => Carbon::now()->addDays(1),
                'priority' => 2,
                'is_completed' => false,
                'user_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('todos')->insert($todos);
    }
}
