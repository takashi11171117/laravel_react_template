<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PDFRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'filename' => 'required|max:60',
        ];
    }
}
