<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use App\Http\Requests\ImageRequest;
use App\Http\Resources\Image\ImageResource;
use App\Http\Resources\Image\ImageCollection;
use App\UseCase\Image\IndexAction;
use App\UseCase\Image\StoreAction;
use App\UseCase\Image\UpdateAction;
use Illuminate\Support\Facades\Log;

class ImageController extends Controller
{
    public function index(IndexAction $action)
    {
        $IndexedImages = $action->handle();

        return new ImageCollection($IndexedImages);

    }

    public function create()
    {
        //
    }

    public function store(ImageRequest $request, StoreAction $action)
    {
        $storedImage = $action->handle($request);

        return new ImageResource($storedImage);
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Image $image,ImageRequest $request, UpdateAction $action)
    {
        //
        $updatedImage = $action->handle($request,$image);

        return new ImageResource($updatedImage);
    }

    public function destroy(string $id)
    {
        //
    }
}
