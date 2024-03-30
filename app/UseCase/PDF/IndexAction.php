<?php

namespace App\UseCase\PDF;

use App\Models\PDF;

class IndexAction
{
    public function handle()
    {

        $pdfs = PDF::all();
        
        return $pdfs;
    }
}
