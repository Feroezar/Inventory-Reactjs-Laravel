<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
        return [
            "inv_brg_id" => ['required', 'exists:inventories,id'],
            'nomor_pr' => ['nullable', 'max:255'],
            'image' => ['nullable', 'image'],
            "description" => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'assigned_user_id' => ['required', 'exists:users,id'],
            'status' => [
                'required',
                Rule::in(['pending', 'in_progress', 'completed'])
            ],
            'priority' => [
                'required',
                Rule::in(['low', 'medium', 'high'])
            ]
        ];
    }
}
