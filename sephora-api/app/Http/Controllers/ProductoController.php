<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index() { return response()->json(Producto::with('categoria')->get(), 200); }
    public function show($id) { return response()->json(Producto::with('categoria')->findOrFail($id), 200); }
    public function store(Request $request) {
        $prod = Producto::create($request->all());
        return response()->json($prod, 201);
    }
    public function update(Request $request, $id) {
        $prod = Producto::findOrFail($id);
        $prod->update($request->all());
        return response()->json($prod, 200);
    }
    public function destroy($id) {
        Producto::destroy($id);
        return response()->json(null, 204);
    }
}
