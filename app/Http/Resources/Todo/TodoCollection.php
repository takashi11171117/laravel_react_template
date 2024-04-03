<?php

namespace App\Http\Resources\Todo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TodoCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'items' => $this->collection->map(function ($todo) {
                return new TodoResource($todo);
            }),
        ];
    }
}
