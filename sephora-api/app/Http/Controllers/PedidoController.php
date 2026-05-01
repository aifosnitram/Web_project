<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index() { return response()->json(Pedido::with(['cliente.persona', 'detalles.producto'])->get(), 200); }
    public function show($id) { return response()->json(Pedido::with(['cliente.persona', 'detalles.producto'])->findOrFail($id), 200); }
    public function store(Request $request) { return response()->json(Pedido::create($request->all()), 201); }
    public function update(Request $request, $id) {
        $pedido = Pedido::findOrFail($id);
        $pedido->update($request->all());
        return response()->json($pedido, 200);
    }
    public function destroy($id) {
        Pedido::destroy($id);
        return response()->json(null, 204);
    }
}
