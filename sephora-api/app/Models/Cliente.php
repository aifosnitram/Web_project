<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    public $incrementing = false; // Primary key is not auto-incrementing

    protected $fillable = ['id', 'email', 'password'];

    protected $hidden = ['password'];

    public function persona()
    {
        return $this->belongsTo(Persona::class, 'id');
    }

    public function carritos()
    {
        return $this->hasMany(Carrito::class);
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }
}
