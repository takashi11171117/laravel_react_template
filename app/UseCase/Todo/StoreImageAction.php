<?php

namespace App\UseCase\Todo;

use App\Models\Image;
use App\Models\Todo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ImageRequest;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class StoreImageAction
{
    public function handle(ImageRequest $request, Todo $todo)
{
    return DB::transaction(function () use ($request, $todo) {
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
            'todo_id' => $todo->id
        ];

        $image = Image::create($imageData);

        //$todo->update(['image_id' => $image->id]);

        return $todo;
    });
}
}
