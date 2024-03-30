<?php

namespace App\UseCase\PDF;

use App\Models\Pdf;
use Illuminate\Support\Facades\DB;

class DestroyAction
{
    public function handle(Pdf $pdf)
    {

        return DB::transaction(function () use ($pdf) {
            $pdf->delete();
        });
    }
}
