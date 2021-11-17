<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Todo', [
        'todos' => [
            'Play video game',
            'Code fun',
            'Hello world'
        ]
    ]);
});

Route::get('/work', function () {
    return Inertia::render('Work');
});
