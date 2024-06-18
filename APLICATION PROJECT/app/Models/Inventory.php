<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;
    protected $fillable = [
        'image_path',
        'kode_barang',
        'name',
        'stock',
        'category_id',
        'divisi_inv',
        'created_by',
        'updated_by',
    ];
    public function categoryid()
     {
        return $this->belongsTo(Category::class, 'category_id');
     }
    public function divisiinv()
     {
        return $this->belongsTo(Role::class, 'divisi_inv');
     }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
