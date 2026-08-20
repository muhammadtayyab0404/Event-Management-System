<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

return Application::configure(
    basePath: dirname(__DIR__)
)
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(function (Middleware $middleware): void {

        $middleware->statefulApi();

        // TEMPORARY: Postman testing only
        $middleware->preventRequestForgery(
            except: [
                'api/login',
            ]
        );

    })

    ->withExceptions(function (Exceptions $exceptions): void {

        /*
        |--------------------------------------------------------------------------
        | API errors ko JSON mein return karo
        |--------------------------------------------------------------------------
        */
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) =>
                $request->is('api/*') ||
                $request->expectsJson()
        );


        /*
        |--------------------------------------------------------------------------
        | Fortify Login Error
        |--------------------------------------------------------------------------
        |
        | Agar /api/login par email/password incorrect ho
        | to apna custom JSON response return karenge.
        |
        */
        $exceptions->render(
            function (
                ValidationException $exception,
                Request $request
            ) {

                // Sirf login API ke liye
                if (!$request->is('api/login')) {
                    return null;
                }

                $errors = $exception->errors();


                /*
                |--------------------------------------------------------------------------
                | Incorrect Credentials
                |--------------------------------------------------------------------------
                */
                if (
                    isset($errors['email']) &&
                    collect($errors['email'])->contains(
                        fn ($message) =>
                            str_contains(
                                strtolower($message),
                                'credentials'
                            )
                    )
                ) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Email or password is incorrect.',
                    ], 422);
                }


                /*
                |--------------------------------------------------------------------------
                | Normal Validation Errors
                |--------------------------------------------------------------------------
                |
                | Example:
                | email empty
                | password empty
                |
                */
                return response()->json([
                    'success' => false,
                    'message' => 'Please check the provided information.',
                    'errors' => $errors,
                ], 422);
            }
        );

    })

    ->create();