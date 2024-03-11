<?php

namespace App\UseCase\Todo;

use App\Http\Resources\Todo\TodoCollection;
use App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;

class IndexAction
{
    public function handle(): Collection
    {
        $todos =  Todo::all();

        return $todos;
    }
}
