<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciales invalidas.',
                'success' => false,
            ], 401);
        }

        /** @var User $user */
        $user = User::with('role')->where('email', $request->email)->firstOrFail();

        $user->tokens()->delete();
        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => $this->usuarioConRol($user),
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesion cerrada correctamente.',
            'success' => true,
        ], 200);
    }

    public function usuario(Request $request)
    {
        $user = $request->user()->load('role');

        return response()->json([
            'success' => true,
            'user' => $this->usuarioConRol($user),
        ], 200);
    }

    private function usuarioConRol(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_id' => $user->role_id,
            'role' => $user->role ? [
                'id' => $user->role->id,
                'nombre' => $user->role->nombre,
                'slug' => $user->role->slug,
                'descripcion' => $user->role->descripcion,
            ] : null,
        ];
    }
}
