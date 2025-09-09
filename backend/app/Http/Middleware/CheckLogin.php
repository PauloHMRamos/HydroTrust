<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CheckLogin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if (!Session::get('logado')) {
            // Redireciona para a rota de login, ajuste conforme sua rota
            return redirect('/login');
        }

        return $next($request);
    }
}
