<?php

namespace App\UseCase\Todo;

use App\Models\Pdf;
use App\Models\Todo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PDFRequest;
use TCPDF;
use setasign\Fpdi\Tcpdf\Fpdi;

class StorePDFAction
{
    public function handle(Todo $todo, PDFRequest $request)
    {
        return DB::transaction(function () use ($todo, $request) {
        
            if($request->filename !== null){

                $content = $todo->content;

                $pdf = new TCPDF();
                $pdf->AddPage();
                $pdf->writeHTML($content);

                try {
                    //$tempPdfFile = storage_path('app/public/pdfs/' . $todo->content . '.pdf');
                    $tempPdfFile = storage_path('app/public/pdfs/'.$request->filename);
                    $pdf->Output($tempPdfFile, 'F');

                    $pdfFpdi = new Fpdi();
                    $pageCount = $pdfFpdi->setSourceFile($tempPdfFile);

                    $pdfFpdi->setPrintHeader(false); 
                    $pdfFpdi->setPrintFooter(false); 
                    $pdfFpdi->SetAutoPageBreak(false);
                    $pdfFpdi->SetMargins(0, 0, 0);

                    for ($pageNumber = 1; $pageNumber <= $pageCount; $pageNumber++) {
                        $importPage = $pdfFpdi->importPage($pageNumber);
                        $pdfFpdi->AddPage();
                        $pdfFpdi->useTemplate($importPage);
            
                    }
                } catch (\Throwable $th) {
                    return response()->json(['error' => 'PDF generation error: ' . $th->getMessage()], 500);
                }

                $PDFData = [
                    'filename' => $todo->content . '.pdf',
                    'todo_id' => $todo->id
                ];
        
                $pdf = Pdf::create($PDFData);
        
            }

            return $todo;
        });
    }
}
