<?php

namespace App\UseCase\Image;

use App\Models\Image;

class IndexAction
{
    public function handle()
    {

        $images = Image::all();
        
        return $images;
    }
}
