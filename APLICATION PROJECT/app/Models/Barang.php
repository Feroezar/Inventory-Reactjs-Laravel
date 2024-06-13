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
        return $this->belongsTo(Role::class, 'dv_barang');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function getStatusAttribute()
    {
        if ($this->stock < 0) {
            return 'empty';
        } elseif ($this->stock < 5) {
            return 'low_stock';
        } else {
            return 'safe';
        }
    }
}
