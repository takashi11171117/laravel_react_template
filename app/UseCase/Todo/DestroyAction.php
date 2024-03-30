<?php

namespace App\UseCase\Todo;

use App\Models\Todo;

class DestroyAction
{
    public function handle(Todo $todo)
    {
        $todo->delete();
    }
}
