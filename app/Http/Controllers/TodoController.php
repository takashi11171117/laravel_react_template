<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        $products = Todo::all();
        return response()->json(
            $products, 200
        );
    }

    public function store(TodoRequest $request)
    {
        $todo = Todo::create($request->all());
        return response()->json(
            $todo, 201
        );
    }

    public function update(TodoRequest $request, int $id)
    {
        $update = [
            'name' => $request->name,
            'content' => $request->content,
        ];
        $todo = Todo::where('id', $id)->update($update);
        $todos = Todo::all();
        if ($todo) {
            return response()->json(
                $todos
            , 200);
        } else {
            return response()->json([
                'message' => 'The todo is not found',
            ], 404);
        }
    }

    public function destroy(int $id)
    {
        $product = Todo::where('id', $id)->delete();
        if ($product) {
            return response()->json([
                'message' => 'The todo was deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'The todo is not found',
            ], 404);
        }
    }

}
