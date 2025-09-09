<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

// AUTH: LOGIN / LOGOUT / SIGNUP
Route::middleware(['web'])->group(function () {
    Route::post('/api/login', [AuthController::class, 'login']);
    Route::post('/api/signup', [AuthController::class, 'signup']);
});

// SESSION CHECK (opcional, para verificar se o token é válido)
Route::get('/session-check', [AuthController::class, 'sessionCheck']);

// PROTEGIDAS POR TOKEN
Route::middleware('auth')->group(function () {
    // Dashboard principal
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Criar algo no dashboard (poderia ser POST também, dependendo do que faz)
    Route::get('/dashboard/create', [DashboardController::class, 'create']);

    
});
