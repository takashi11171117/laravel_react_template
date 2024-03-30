<?php

namespace App\Http\Resources\PDF;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PDFCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'pdfs' => $this->collection->map(function ($pdf) {
                return new PDFResource($pdf);
            }),
        ];
    }
}
