<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index() { return response()->json(Categoria::all(), 200); }
    public function show($id) { return response()->json(Categoria::findOrFail($id), 200); }
    public function store(Request $request) { 
        $cat = Categoria::create($request->all());
        return response()->json($cat, 201);
    }
    public function update(Request $request, $id) {
        $cat = Categoria::findOrFail($id);
        $cat->update($request->all());
        return response()->json($cat, 200);
    }
    public function destroy($id) {
        Categoria::destroy($id);
        return response()->json(null, 204);
    }
}
