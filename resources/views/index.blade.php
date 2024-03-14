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
        <div>image upload section
            <form method="get" action="{{route("images.index")}}" >
                <button type="submit" >画像データ一覧を見る</button>     
            </form>
            <form method="post" action="{{route("images.store")}}"  enctype="multipart/form-data" onsubmit="return validateForm()">
                @csrf
                画像登録用
                <label for="image" >画像</label>
                <input type="file" id="image" name="image" required accept=“image/png,image/jpeg,image/jpg” >
                <label for="title">タイトル</label>
                <input type="text" id="title" name="title">
                <label for="filename">ファイル名</label>
                <input type="text" id="filename" name="filename" required>
                <button type="submit" >登録する</button>     
            </form>
        </div>
    </body>
    <script>
        function validateForm() {
            var filenameInput = document.getElementById('filename');
            var filename = filenameInput.value;
            if (!/\.(jpg|jpeg|png)$/i.test(filename)) {
                alert('有効なファイル形式は .jpg, .jpeg, .png です。');
                return false;
            }
            return true;
        }
    </script>
</html>