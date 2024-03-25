<?php

namespace App\UseCase\PDF;

use App\Models\Pdf;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PDFRequest;
use Illuminate\Support\Facades\Storage;

class StoreAction
{
    public function handle(PDFRequest $request)
    {

        return DB::transaction(function () use ($request) {

            /*
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
            */
        });
    }
}
