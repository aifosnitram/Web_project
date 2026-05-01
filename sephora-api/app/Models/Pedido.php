<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha', 'total', 'fecha_mora', 'fecha_envio', 'fecha_entrega', 
        'cliente_id', 'empleado_id', 'transportista_id'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function empleado()
    {
        return $this->belongsTo(Empleado::class);
    }

    public function transportista()
    {
        return $this->belongsTo(Transportista::class);
    }

    public function detalles()
    {
        return $this->hasMany(Detalle::class);
    }
}
