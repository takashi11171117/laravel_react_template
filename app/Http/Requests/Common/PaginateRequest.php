<?php

namespace App\Http\Requests\Common;

use Illuminate\Foundation\Http\FormRequest;

class PaginateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'per_page' => [
                'nullable',
                'integer',
                'min:1',
                'max:200',
            ],
        ];
    }
}
