<?php

namespace App\UseCase\Image;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Image;
use App\Http\Requests\ImageRequest;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class UpdateAction
{
    public function handle(ImageRequest $request, Image $image)
    {

        return DB::transaction(function () use ($request,$image) {

            if($request->has('image')){
                $imageFile = $request->image;

                $manager = new ImageManager(new Driver());

                $managedImage = $manager->read($imageFile);

                $resizedImage = $managedImage->resize(1920, 1080)->encode();

                if (!is_null($imageFile) && $imageFile->isValid()) {
                    Storage::disk('public')->delete('images/' . $image->filename);
                    Storage::put('public/images/' . $request->filename, $resizedImage);
                }
            }
            else{
                Storage::disk('public')->move('images/' . $image->filename,'images/' . $request->filename);
            }

            $imageData = [
                'title' => $request->title,
                'filename' => $request->filename,
            ];

            $image->update($imageData);
            $updatedImage = Image::find($image->id);

            return $updatedImage;
        });
    }
}
