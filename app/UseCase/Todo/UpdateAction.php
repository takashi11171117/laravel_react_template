<?php

namespace App\UseCase\Todo;

use App\Models\Todo;
use App\Http\Requests\TodoRequest;

class UpdateAction
{
    public function handle(TodoRequest $request, Todo $todo)
    {
        $update = [
            'name' => $request->name,
            'content' => $request->content,
        ];
        $todo->update($update);

        $todos = Todo::all();

        return $todos;
    }
}
