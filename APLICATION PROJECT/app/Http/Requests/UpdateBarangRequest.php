<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBarangRequest extends FormRequest
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
            'image' => ['nullable', 'image'],
            "kode_barang" => ['required', 'max:255'],
            "nm_barang" => ['required', 'max:255'],
            'stock' => ['required', 'max:255'],
            'nomor_pr' => ['nullable', 'max:255'],
            'kategori' => ['required', 'exists:categories,id'], // corrected spelling
            'dv_barang' => ['required', 'exists:roles,id'],     // corrected spelling
        ];
    }
}
