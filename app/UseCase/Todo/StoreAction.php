<?php

namespace App\UseCase\Todo;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;
use App\Http\Requests\TodoRequest;

class StoreAction
{
    public function handle(TodoRequest $request)
    {
        $todo = Todo::create($request->all());
        
        return $todo;
    }
}
