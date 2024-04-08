<?php

namespace App\UseCase\Todo;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use App\Http\Requests\TodoRequest;
use App\Mail\NotifyingRegiterTodoMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class StoreAction
{
    public function handle(TodoRequest $request)
    {
        /*
        $todo = Todo::create($request->all());
        
        return $todo;
        */

        return DB::transaction(function () use ($request) {
            //dd('StoreAction');

            $todo = Todo::create($request->all());

            $userId = 1;

            $user = User::findOrFail($userId);

            //mail作成
            Mail::to($user)->send(new NotifyingRegiterTodoMail($user));
    
            return $todo;
        });
    }
}
