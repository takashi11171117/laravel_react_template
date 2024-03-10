<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;


class TodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * ここの設定が誰に対してどのような認証が下りるか詳しく書いてあるのであえて残しました
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|min:1|max:10',
            'content' => 'max:50',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'タイトルが未入力です',
            'content.required' => '著者が未入力です',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json([
            'message' => 'Failed validation',
            'errors' => $errors,
        ], 422, [], JSON_UNESCAPED_UNICODE));
    }
}
