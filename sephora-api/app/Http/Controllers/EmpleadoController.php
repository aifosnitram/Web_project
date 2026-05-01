<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmpleadoController extends Controller
{
    public function index() { return response()->json(Empleado::with('persona')->get(), 200); }
    public function show($id) { return response()->json(Empleado::with('persona')->findOrFail($id), 200); }
    public function store(Request $request) {
        DB::beginTransaction();
        try {
            $persona = Persona::create($request->only(['nombre', 'apellido', 'telf', 'direccion']));
            $empleado = Empleado::create(['id' => $persona->id]);
            DB::commit();
            return response()->json($empleado->load('persona'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function update(Request $request, $id) {
        $empleado = Empleado::findOrFail($id);
        $empleado->persona->update($request->only(['nombre', 'apellido', 'telf', 'direccion']));
        return response()->json($empleado->load('persona'), 200);
    }
    public function destroy($id) {
        Persona::destroy($id);
        return response()->json(null, 204);
    }
}
