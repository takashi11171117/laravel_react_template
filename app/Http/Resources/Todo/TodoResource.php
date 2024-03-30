<?php

namespace App\Http\Resources\Todo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $images = $this->images;
        $pdfs = $this->pdfs;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'content' => $this->content,
            'image_ids' => $images->pluck('id')->toArray(),
            'image_titles' => $images->pluck('title')->toArray(),
            'image_filenames' => $images->pluck('filename')->toArray(),
            'pdf_ids' => $pdfs->pluck('id')->toArray(),
            'pdf_filenames' => $pdfs->pluck('filename')->toArray(),
        ];
    }
}
