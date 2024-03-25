<?php

namespace App\Http\Controllers;


use App\Models\Pdf;
use App\Http\Resources\PDF\PDFResource;
use App\Http\Resources\PDF\PDFCollection;
use Illuminate\Http\Request;
use App\Http\Requests\PDFRequest;
use App\UseCase\PDF\IndexAction;
use App\UseCase\PDF\StoreAction;
use App\UseCase\PDF\DestroyAction;
use Symfony\Component\HttpFoundation\Response;

class PdfController extends Controller
{
    //
    public function index(IndexAction $action)
    {
        $IndexedPdfs = $action->handle();

        return new PDFCollection($IndexedPdfs);
    
    }

    public function store(PDFRequest $request, StoreAction $action)
    {

        $storedImage = $action->handle($request);

        return new PDFResource($storedImage);
    }

    public function destroy(Pdf $pdf, DestroyAction $action)
    {

        $action->handle($pdf);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
