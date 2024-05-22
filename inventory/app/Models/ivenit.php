<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ivenit extends Model
{
    use HasFactory;
    
    protected $fillable = ['image_path', 'nomor_pr', 'nm_barang', 'description', 'stock', 'created_by', 'updated_by'];
    public function tasks(){
        
    }
    public function createdby(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedby(){
        return $this->belongsTo(User::class, 'updated_by');
    }    
}
