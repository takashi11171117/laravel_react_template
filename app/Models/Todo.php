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

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($todo) {
            $images = $todo->images;
            
            foreach($images as $image){
                Storage::disk('public')->delete('images/' . $image->filename);
            }
        });
    }
}
