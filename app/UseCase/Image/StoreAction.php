<?php

namespace App\UseCase\Image;

use App\Models\Image;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ImageRequest;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class StoreAction
{
    public function handle(ImageRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $imageFile = $request->image;

            $manager = new ImageManager(new Driver());

            $image = $manager->read($imageFile);

            $resizedImage = $image->resize(1920, 1080)->encode();

            if (!is_null($imageFile) && $imageFile->isValid()) {
                Storage::put('public/images/' . $request->filename, $resizedImage);
            }

            $imageData = [
                'title' => $request->title,
                'filename' => $request->filename,
            ];

            $image = Image::create($imageData);

            return $image;
        });
    }
}
