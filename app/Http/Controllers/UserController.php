<?php

namespace App\Http\Controllers;

use App\Http\Requests\Common\PaginateRequest;
use App\Http\Resources\User\UserCollection;
use App\UseCase\User\IndexAction;

class UserController extends Controller
{
    public function index(PaginateRequest $request, IndexAction $action)
    {
        $users = $action->handle($request->per_page);

        return new UserCollection($users);
    }
}
