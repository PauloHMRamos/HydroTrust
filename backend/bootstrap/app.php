<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'auth' => \App\Http\Middleware\Authenticate::class,
        'bindings' => SubstituteBindings::class,
        'session' => StartSession::class, // alias para o middleware de sessão
    ]);

    $middleware->group('api', [
        'bindings',
        'session',  // adiciona o middleware de sessão aqui
    ]);
    })
   ->withExceptions(function (Exceptions $exceptions) {
    $exceptions->renderable(function (ValidationException $e, $request) {
        if ($request->is('api/*')) {
            return new JsonResponse([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
            ], $e->status);
        }
    });
})
    ->create();
