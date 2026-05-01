<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    public function index() { return response()->json(Persona::all(), 200); }
    public function show($id) { return response()->json(Persona::findOrFail($id), 200); }
    public function store(Request $request) { return response()->json(Persona::create($request->all()), 201); }
    public function update(Request $request, $id) {
        $persona = Persona::findOrFail($id);
        $persona->update($request->all());
        return response()->json($persona, 200);
    }
    public function destroy($id) {
        Persona::destroy($id);
        return response()->json(null, 204);
    }
}
