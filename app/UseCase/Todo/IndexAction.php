<?php

namespace App\UseCase\Todo;

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
