$port = 8080
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "Servidor Web Local iniciado em $prefix" -ForegroundColor Green
    Write-Host "Para parar o servidor, feche esta janela ou aperte Ctrl+C." -ForegroundColor Yellow
    
    # Abrir o navegador automaticamente
    Start-Process $prefix
}
catch {
    Write-Host "Erro ao iniciar na porta $port. A porta pode estar em uso." -ForegroundColor Red
    exit
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ($urlPath -eq "") {
            $urlPath = "index.html"
        }
        
        $filePath = Join-Path $PWD $urlPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "text/plain"
            
            switch ($extension) {
                ".html" { $contentType = "text/html" }
                ".htm" { $contentType = "text/html" }
                ".css" { $contentType = "text/css" }
                ".js" { $contentType = "application/javascript" }
                ".png" { $contentType = "image/png" }
                ".jpg" { $contentType = "image/jpeg" }
                ".jpeg" { $contentType = "image/jpeg" }
                ".gif" { $contentType = "image/gif" }
                ".svg" { $contentType = "image/svg+xml" }
                ".json" { $contentType = "application/json" }
            }
            
            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            
            Write-Host "200 OK: /$urlPath" -ForegroundColor Cyan
        }
        else {
            $response.StatusCode = 404
            $errorMsg = "404 - Not Found"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($errorMsg)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            
            Write-Host "404 Not Found: /$urlPath" -ForegroundColor Red
        }
        
        $response.Close()
    }
}
finally {
    $listener.Stop()
    $listener.Close()
}
