<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = ['id'];

    public function persona()
    {
        return $this->belongsTo(Persona::class, 'id');
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }
}
