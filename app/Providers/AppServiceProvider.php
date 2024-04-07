<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
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
    }
}
