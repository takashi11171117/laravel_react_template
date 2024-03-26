<?php

namespace App\Http\Resources\PDF;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PDFResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'filename' => $this->filename,
        ];
    }
}
