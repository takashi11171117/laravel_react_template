<?php

namespace App\UseCase\Todo;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;

class ShowAction
{
    public function handle(int $id)
    {
        $todo =  Todo::where("id",$id)->first();

        return $todo;
    }
}
