<?php
// Router para el servidor PHP
$requested_url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// API endpoints
if (strpos($requested_url, '/api/') === 0) {
    require __DIR__ . '/public/api.php';
    return true;
}

// Static files
if (preg_match('/\.(jpg|jpeg|png|gif|css|js|json|webp|avif|webm)$/i', $requested_url)) {
    return false;  // Serve the actual file
}

// Default - serve public/index.php
require __DIR__ . '/public/index.php';
?>
