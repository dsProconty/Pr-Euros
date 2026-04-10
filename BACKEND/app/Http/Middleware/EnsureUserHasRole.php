<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserHasRole
{
    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles  ids permitidos, ej: 1,3
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        if (!$user || $user->role_id === null) {
            return response()->json([
                'message' => 'No autorizado.',
                'success' => false,
            ], 403);
        }

        $allowed = array_map('intval', $roles);

        if (!in_array((int) $user->role_id, $allowed, true)) {
            return response()->json([
                'message' => 'No tiene permiso para esta accion.',
                'success' => false,
            ], 403);
        }

        return $next($request);
    }
}
