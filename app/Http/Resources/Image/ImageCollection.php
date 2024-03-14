<?php

namespace App\Http\Resources\Image;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ImageCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'images' => $this->collection->map(function ($image) {
                return new ImageResource($image);
            }),
        ];
    }
}
