<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // Middleware atualizado para API
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // Retorna dados do usuário autenticado
    public function index()
    {
        $user = auth()->user();

        // Exemplo de estrutura de resposta (adapte conforme sua lógica)
        return response()->json([
            'message' => 'Dados do dashboard',
            'user' => $user,
            // 'relatorios' => [...], // adicionar quando tiver
        ]);
    }

    // Criar recurso ou preparar dados (ainda depende do seu uso)
    public function create()
    {
        return response()->json([
            'message' => 'Endpoint /dashboard/create acessado com sucesso',
            'user' => auth()->user()
        ]);
    }
}
