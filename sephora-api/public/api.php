<?php
// API endpoint that serves products from the SQLite database
// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get products from database
$products = getProductsFromDatabase();

// Handle GET request for all products
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/api/productos') !== false) {
    echo json_encode($products);
    http_response_code(200);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}

function getProductsFromDatabase() {
    try {
        // Path to SQLite database relative to this file
        $dbPath = __DIR__ . '/../database/database.sqlite';
        
        if (!file_exists($dbPath)) {
            return [];
        }
        
        $db = new PDO('sqlite:' . $dbPath);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $db->query('SELECT p.*, c.nombre as categoria_nombre FROM productos p LEFT JOIN categorias c ON p.categoria_id = c.id');
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $products = [];
        foreach ($results as $row) {
            // Map categoria_id to folder names
            $categoriaMap = [
                1 => 'perfume',
                2 => 'skincare',
                3 => 'makeup',
                4 => 'champus',
                5 => 'cepillos'
            ];
            
            $categoriaName = $categoriaMap[$row['categoria_id']] ?? 'cosmetica';
            
            $products[] = [
                'id' => intval($row['id']),
                'nombre' => $row['nombre'],
                'precio' => floatval($row['precio']),
                'img' => $row['img'] ?? 'default.jpg',
                'categoria_id' => intval($row['categoria_id']),
                'categoria' => $categoriaName
            ];
        }
        
        return $products;
    } catch (Exception $e) {
        error_log('Database error: ' . $e->getMessage());
        return [];
    }
}
?>

