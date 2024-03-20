<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>sample-api</title>

        @viteReactRefresh
        @vite(['resources/sass/app.scss', 'resources/ts/index.tsx'])

    </head>
    <body class="antialiased">
        <div id="app"></div>
        {{--
        画像を選択してから画像のタイトルとファイル名を書き込んで登録するようになっています。
        扱う拡張子は今のところjpg,jpeg,pngにしています。
        取り込まれた画像はintevention image v3によって1920*1080のサイズに変更されるようにしています。
        余計かもしれませんが、自分の勉強のためにupdateの処理はこういう感じになるのではないか？と予想して先にある程度作成してみました    
            --}}
    </body>
</html>