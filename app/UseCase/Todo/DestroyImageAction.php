<?php

namespace App\UseCase\Todo;

use App\Models\Image;
use App\Models\Todo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ImageRequest;

class DestroyImageAction
{
    public function handle(Todo $todo, Image $image)
    {
        return DB::transaction(function () use ($todo, $image) {

            if($image->filename !== null){
                Storage::disk('public')->delete('images/' . $image->filename);

                $image->delete();

                return $todo;
            }

            /*
            Storage::disk('public')->delete('images/' . $image->filename);

            $image->delete();

            return $todo;
            */
        });
    }
}