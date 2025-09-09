<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class AuthController extends Controller
{
    // LOGIN
  public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Email ou senha inválidos.'], 401);
    }

    $user = Auth::user();

    // Gera token único e salva na base
    $token = Str::random(60);
    $user->api_token = hash('sha256', $token);
    $user->save();

    return response()->json([
        'message' => 'Login realizado com sucesso.',
        'user' => $user,
        'token' => $token,  // Retorna o token "limpo"
    ]);
}


    // LOGOUT
    public function logout(Request $request)
{
    $user = $request->user();
    if ($user) {
        $user->api_token = null;
        $user->save();
    }

    return response()->json(['message' => 'Logout realizado com sucesso.']);
}

    // REGISTRO
    public function signup(Request $request)
    {

        
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->nome,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Cadastro realizado com sucesso.',
            'user' => $user,
        ], 201);
    }

    // CHECAGEM DE SESSÃO
    public function sessionCheck(Request $request)
    {
        if (Auth::check()) {
            return response()->json([
                'authenticated' => true,
                'user' => Auth::user(),
            ]);
        }

        return response()->json(['authenticated' => false], 401);
    }
}
