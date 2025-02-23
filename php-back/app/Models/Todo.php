<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Todo extends Model
{
    use HasFactory;

    // 入力が必要な項目
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'priority',
        'is_completed',
        'user_id'
    ];
}
