<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pdf extends Model
{
    use HasFactory;

    protected $fillable = [
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

        static::deleting(function($pdf) {
            Storage::disk('public')->delete('pdfs/' . $pdf->filename);
        });
    }
}
