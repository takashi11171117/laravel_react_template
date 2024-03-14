<?php

namespace App\UseCase\Image;

use Illuminate\Support\Facades\Storage;
use App\Models\Image;
use App\Http\Requests\ImageRequest;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class UpdateAction
{
    public function handle(ImageRequest $request, Image $image)
    {
        
        $requestedImage = $request->image;

        $manager = new ImageManager(new Driver());

        $imageData = $manager->read($requestedImage);

        $resizedImage = $imageData->resize(1920, 1080)->encode();

        if(!is_null($requestedImage) && $requestedImage->isValid() ){
            Storage::put($image->filename, $resizedImage);
        } 

        $updatedImage = $image;

        return $updatedImage;
    }
}
