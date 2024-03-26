<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'filename',
        'todo_id'
    ];

    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($image) {
            Storage::disk('public')->delete('images/' . $image->filename);
        });
    }
}
