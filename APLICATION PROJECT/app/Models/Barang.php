<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_path',
        'kode_barang',
        'nm_barang',
        'stock',
        'status',
        'kategori',
        'dv_barang',
        'created_by',
        'updated_by',
    ];
    public function nmCategory()
    {
        return $this->belongsTo(Category::class, 'kategori');
    }
    public function brgDivisi()
    {
        return $this->belongsTo(Category::class, 'dv_barang');
    }
}
