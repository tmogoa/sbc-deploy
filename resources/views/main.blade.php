<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta name="description" content="Sudek Boys Club (SBC) is a Family Club run by a group of Nairobi parents whose aim is to help their sons grow into young men of character through constructive use of their free time on weekends and school holidays."/>

        <title>Sudek Boys Club</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <link rel="shortcut icon" type="image/webp" href="{{ asset('images/logo.webp') }}"/>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet"  rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
        
    </head>
    <body class="w-screen overflow-x-hidden">
        <!-- React root DOM -->
        <div id="root" class="font-sans">
        </div>

        <!-- React JS -->
        <script src="{{ asset('js/app.js') }}" defer></script>
    </body>
</html>
