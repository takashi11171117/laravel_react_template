<?php

namespace App\UseCase\Image;

use App\Models\Image;
use Illuminate\Support\Facades\DB;

class DestroyAction
{
    public function handle(Image $image)
    {
        return DB::transaction(function () use ($image) {
            $image->delete();
        });
    }
}
