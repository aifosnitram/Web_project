<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{
    public function index() { return response()->json(Cliente::with('persona')->get(), 200); }
    public function show($id) { return response()->json(Cliente::with('persona')->findOrFail($id), 200); }
    public function store(Request $request) {
        DB::beginTransaction();
        try {
            $persona = Persona::create($request->only(['nombre', 'apellido', 'telf', 'direccion']));
            $cliente = Cliente::create([
                'id' => $persona->id,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            DB::commit();
            return response()->json($cliente->load('persona'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function update(Request $request, $id) {
        $cliente = Cliente::findOrFail($id);
        DB::beginTransaction();
        try {
            if ($request->hasAny(['nombre', 'apellido', 'telf', 'direccion'])) {
                $cliente->persona->update($request->only(['nombre', 'apellido', 'telf', 'direccion']));
            }
            if ($request->has('email') || $request->has('password')) {
                $data = $request->only(['email']);
                if ($request->has('password')) {
                    $data['password'] = Hash::make($request->password);
                }
                $cliente->update($data);
            }
            DB::commit();
            return response()->json($cliente->load('persona'), 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function destroy($id) {
        // Deleting Persona will cascade and delete Cliente due to FK constraints
        Persona::destroy($id);
        return response()->json(null, 204);
    }
    
    // Auth login endpoint
    public function login(Request $request) {
        $cliente = Cliente::where('email', $request->email)->first();
        if ($cliente && Hash::check($request->password, $cliente->password)) {
            return response()->json($cliente->load('persona'), 200);
        }
        return response()->json(['error' => 'Credenciales inválidas'], 401);
    }
}
