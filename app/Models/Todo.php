<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'content',
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function pdfs()
    {
        return $this->hasMany(Pdf::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($todo) {
            $images = $todo->images;
            $pdfs = $todo->pdfs;

            foreach($images as $image){
                Storage::disk('public')->delete('images/' . $image->filename);
            }

            foreach($pdfs as $pdf){
                Storage::disk('public')->delete('pdfs/' . $pdf->filename);
            }

        });
    }
}
