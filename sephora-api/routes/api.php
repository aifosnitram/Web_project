<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\TransportistaController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\DetalleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [ClienteController::class, 'login']);
Route::get('/check-email', [ClienteController::class, 'checkEmail']);

Route::apiResource('categorias', CategoriaController::class);
Route::apiResource('productos', ProductoController::class);
Route::apiResource('personas', PersonaController::class);
Route::apiResource('clientes', ClienteController::class);
Route::apiResource('empleados', EmpleadoController::class);
Route::apiResource('transportistas', TransportistaController::class);

Route::apiResource('carritos', CarritoController::class);
Route::post('carritos/{id}/productos', [CarritoController::class, 'addProducto']);
Route::delete('carritos/{id}/productos/{producto_id}', [CarritoController::class, 'removeProducto']);

Route::apiResource('pedidos', PedidoController::class);
Route::apiResource('detalles', DetalleController::class);
