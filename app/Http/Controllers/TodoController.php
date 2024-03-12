<?php

namespace App\Http\Controllers;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use App\Http\Resources\Todo\TodoCollection;
use App\Http\Resources\Todo\TodoResource;
use App\UseCase\Todo\IndexAction;
use App\UseCase\Todo\ShowAction;
use App\UseCase\Todo\StoreAction;
use App\UseCase\Todo\UpdateAction;
use App\UseCase\Todo\DestroyAction;
use Symfony\Component\HttpFoundation\Response;

class TodoController extends Controller
{

    public function index(IndexAction $action)
    {
        $todos = $action->handle();

        return new TodoCollection($todos);
    }

    public function show(ShowAction $action,int $id)
    {
        $todo = $action->handle($id);

        return new TodoResource($todo);
    }

    public function store(TodoRequest $request, StoreAction $action)
    {
        $todo = $action->handle($request);

        return new TodoResource($todo);
    }

    public function update(Todo $todo,TodoRequest $request, UpdateAction $action)
    {
        $updatedTodo = $action->handle($request,$todo);

        return new TodoResource($updatedTodo);
    }

    public function destroy(Todo $todo, DestroyAction $action)
    {

        $action->handle($todo);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
