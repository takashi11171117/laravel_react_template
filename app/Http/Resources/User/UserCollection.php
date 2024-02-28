<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'items' => $this->collection->map(function ($notice) {
                return new UserResource($notice);
            }),
        ];
    }
}
