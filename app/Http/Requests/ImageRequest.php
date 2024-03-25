<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class ImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'max:10',
            'filename' => 'required|max:50',
            'image' => 'image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
