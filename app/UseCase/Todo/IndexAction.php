<?php

namespace App\UseCase\Todo;

use App\Models\Todo;
use Illuminate\Pagination\LengthAwarePaginator;

class IndexAction
{
    public function handle(?int $perPage): LengthAwarePaginator
    {
        $todos = Todo::paginate($perPage ?? config('constants.PER_PAGE'));

        return $todos;
    }
}
