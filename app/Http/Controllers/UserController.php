<?php

namespace App\Http\Controllers;

use App\Http\Requests\Common\PaginateRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\UseCase\User\IndexAction;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user();

        return new UserResource($user);
    }

    public function index(PaginateRequest $request, IndexAction $action)
    {
        $users = $action->handle($request->per_page);

        return new UserCollection($users);
    }
}
