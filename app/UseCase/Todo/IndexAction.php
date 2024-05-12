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
        $perPage = $request->input('per_page', config('constants.PER_PAGE'));
        $sortBy = $request->input('sort_by', config('constants.SORT_BY'));
        $sortOrder = $request->input('sort_order', config('constants.SORT_ORDER'));


        if (empty($keyword)) {
            $todos = Todo::orderBy($sortBy, $sortOrder)->paginate($perPage);
        }
        else{
            $todos = Todo::where('name', 'like', '%'.$keyword.'%')->orderBy($sortBy, $sortOrder)->paginate($perPage);
        }

        return $todos;
    }

}
