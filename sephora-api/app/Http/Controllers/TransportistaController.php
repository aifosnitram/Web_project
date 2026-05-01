<?php

namespace App\Http\Controllers;

use App\Models\Transportista;
use Illuminate\Http\Request;

class TransportistaController extends Controller
{
    public function index() { return response()->json(Transportista::all(), 200); }
    public function show($id) { return response()->json(Transportista::findOrFail($id), 200); }
    public function store(Request $request) { return response()->json(Transportista::create($request->all()), 201); }
    public function update(Request $request, $id) {
        $transportista = Transportista::findOrFail($id);
        $transportista->update($request->all());
        return response()->json($transportista, 200);
    }
    public function destroy($id) {
        Transportista::destroy($id);
        return response()->json(null, 204);
    }
}
