<?php

namespace App\UseCase\Todo;

use App\Models\Todo;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use App\Http\Requests\Common\PaginateRequest;
use Illuminate\Support\Facades\Log;

class IndexAction
{   
    public function handle(PaginateRequest $request): LengthAwarePaginator
    {
        $keyword = $request->input('keyword', "");
        $perPage = $request->input('per_page',3);

        if(empty($keyword)){
            $todos = Todo::paginate($perPage ?? config('constants.PER_PAGE'));
        }
        else{
            $todos = Todo::where('name', 'like', '%'.$keyword.'%')->paginate($perPage ?? config('constants.PER_PAGE'));
        }

        $sortOrder = $request->input('sort_order', 'asc');

        if($sortOrder === 'desc'){
            $todosItems = $todos->items();
            $sortedItems = collect($todosItems)->sortByDesc('id')->values();
            $todos->setCollection($sortedItems);
        }

        return $todos;
    }

}
