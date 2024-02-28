<?php

namespace App\UseCase\User;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class IndexAction
{
    /**
     * @return LengthAwarePaginator<User> $Users
     */
    public function handle(?int $perPage): LengthAwarePaginator
    {
        $users = User::paginate($perPage ?? config('constants.PER_PAGE'));

        return $users;
    }
}
