<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class ImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        \Log::info('image requestを通過');
        \Log::info($this->input('title'));
        \Log::info($this->filename);
        \Log::info('image request------------');

        return [
            'title' => 'max:10',
            'filename' => 'required|max:50',
            'image' => 'image|mimes:jpg,jpeg,png|max:2048',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            \Log::info('Validated data:');
            \Log::info($this->validated());
        });
    }
    
    protected function failedValidation(Validator $validator)
    {
        \Log::info('Request data:', $this->all());

        parent::failedValidation($validator);
    }
}
