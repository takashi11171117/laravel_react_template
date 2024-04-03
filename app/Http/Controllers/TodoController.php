<?php

namespace App\Http\Controllers;
use App\Http\Requests\TodoRequest;
use App\Http\Requests\ImageRequest;
use App\Http\Requests\PDFRequest;
use App\Models\Todo;
use App\Models\Image;
use App\Http\Resources\Todo\TodoCollection;
use App\Http\Resources\Todo\TodoResource;
use App\UseCase\Todo\IndexAction;
use App\UseCase\Todo\ShowAction;
use App\UseCase\Todo\StoreAction;
use App\UseCase\Todo\StoreImageAction;
use App\UseCase\Todo\StorePDFAction;
use App\UseCase\Todo\UpdateAction;
use App\UseCase\Todo\UpdateImageAction;
use App\UseCase\Todo\DestroyAction;
use App\UseCase\Todo\DestroyImageAction;
use App\Http\Requests\Common\PaginateRequest;
use Symfony\Component\HttpFoundation\Response;

class TodoController extends Controller
{

    public function index(PaginateRequest $request, IndexAction $action)
    {
        $todos = $action->handle($request->per_page);

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

    public function storeImage(Todo $todo,ImageRequest $request, StoreImageAction $action)
    {

        $todo = $action->handle($request,$todo);

        return new TodoResource($todo);
    }

    public function storePdf(Todo $todo,PDFRequest $request, StorePDFAction $action)
    {

        $todo = $action->handle($todo, $request);

        return new TodoResource($todo);
    }


    public function update(Todo $todo,TodoRequest $request, UpdateAction $action)
    {

        $updatedTodo = $action->handle($request,$todo);

        return new TodoResource($updatedTodo);
    }

    public function updateImage(Todo $todo, Image $image, ImageRequest $request, UpdateImageAction $action)
    {

        $updatedTodo = $action->handle($todo,$image, $request);

        return new TodoResource($updatedTodo);
    }


    public function destroy(Todo $todo, DestroyAction $action)
    {

        $action->handle($todo);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    public function destroyImage(Todo $todo, Image $image, DestroyImageAction $action)
    {

        $action->handle($todo, $image);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
