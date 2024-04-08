<?php

namespace App\UseCase\User;

use Log;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class IndexAction
{
    public function handle(?int $perPage): LengthAwarePaginator
    {
        Log::info('Start UserIndex');

        $users = User::paginate($perPage ?? config('constants.PER_PAGE'));

        Log::info('End UserIndex');

        return $users;
    }
}
