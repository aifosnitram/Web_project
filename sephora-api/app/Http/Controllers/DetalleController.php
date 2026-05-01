<?php

namespace App\Http\Controllers;

use App\Models\Detalle;
use Illuminate\Http\Request;

class DetalleController extends Controller
{
    public function index() { return response()->json(Detalle::with('producto')->get(), 200); }
    public function show($id) { return response()->json(Detalle::with('producto')->findOrFail($id), 200); }
    public function store(Request $request) { return response()->json(Detalle::create($request->all()), 201); }
    public function update(Request $request, $id) {
        $detalle = Detalle::findOrFail($id);
        $detalle->update($request->all());
        return response()->json($detalle, 200);
    }
    public function destroy($id) {
        Detalle::destroy($id);
        return response()->json(null, 204);
    }
}
