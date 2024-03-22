<?php

namespace App\UseCase\Todo;

use App\Models\Image;
use App\Models\Todo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ImageRequest;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class UpdateImageAction
{
    public function handle(Todo $todo, Image $image, ImageRequest $request)
    {
        return DB::transaction(function () use ($todo, $image, $request) {
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

            return $todo;
        });
    }
}
