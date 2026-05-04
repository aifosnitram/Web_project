<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Support\Facades\File;
 
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Los nombres de las categorías en el orden deseado para los IDs 1-5
        $categoriasNombres = ['cepillos', 'champus', 'makeup', 'perfume', 'skincare'];
        
        // Ruta a los archivos JSON (asumiendo la estructura del workspace)
        // Intentamos ruta relativa desde la raíz del proyecto Laravel
        $basePath = base_path('../Sephora2/json/');
 
        foreach ($categoriasNombres as $nombre) {
            $categoria = Categoria::create(['nombre' => $nombre]);
            
            $jsonPath = $basePath . $nombre . '.json';
            
            if (File::exists($jsonPath)) {
                $jsonContent = File::get($jsonPath);
                $data = json_decode($jsonContent, true);
                
                // Los JSON tienen una estructura { "nombre_categoria": [ ... ] }
                $productosData = $data[$nombre] ?? [];
                
                foreach ($productosData as $p) {
                    Producto::create([
                        'nombre' => $p['marca'] . ' - ' . $p['tipo'],
                        'precio' => $p['precio'],
                        'img' => $p['img'],
                        'categoria_id' => $categoria->id,
                    ]);
                }
            }
        }
    }
}
