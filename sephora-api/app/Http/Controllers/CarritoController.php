<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\CarritoProducto;
use Illuminate\Http\Request;

class CarritoController extends Controller
{
    public function index() { return response()->json(Carrito::with('productos')->get(), 200); }
    public function show($id) { return response()->json(Carrito::with('productos')->findOrFail($id), 200); }
    public function store(Request $request) { 
        $carrito = Carrito::create($request->all());
        return response()->json($carrito, 201);
    }
    public function update(Request $request, $id) {
        $carrito = Carrito::findOrFail($id);
        $carrito->update($request->all());
        return response()->json($carrito, 200);
    }
    public function destroy($id) {
        Carrito::destroy($id);
        return response()->json(null, 204);
    }

    // Custom method to add products to cart
    public function addProducto(Request $request, $id) {
        $carrito = Carrito::findOrFail($id);
        CarritoProducto::updateOrCreate(
            ['carrito_id' => $id, 'producto_id' => $request->producto_id],
            ['cantidad' => $request->cantidad, 'pxq' => $request->pxq]
        );
        return response()->json($carrito->load('productos'), 200);
    }

    public function removeProducto($id, $producto_id) {
        $carrito = Carrito::findOrFail($id);
        $carrito->productos()->detach($producto_id);
        return response()->json($carrito->load('productos'), 200);
    }
}
