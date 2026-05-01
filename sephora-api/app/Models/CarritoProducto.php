<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CarritoProducto extends Pivot
{
    protected $table = 'carrito_producto';
    public $incrementing = false;

    protected $fillable = ['carrito_id', 'producto_id', 'cantidad', 'pxq'];
}
