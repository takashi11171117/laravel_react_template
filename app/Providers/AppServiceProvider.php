<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use URL;
use Config;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {   
        URL::forceRootUrl(Config::get('app.url'));

        ResetPassword::createUrlUsing(function ($user, string $token) {
            return Config::get('app.url') . '/auth/reset-password/' . $token . '?email=' . $user->email;
        });
    }
}
