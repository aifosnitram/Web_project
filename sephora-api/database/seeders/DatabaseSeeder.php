<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Producto;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        $categoriasNombres = ['perfumes', 'skincare', 'makeup', 'cabello', 'cuerpo'];
        $categorias = [];

        foreach ($categoriasNombres as $nombre) {
            $categorias[] = Categoria::create(['nombre' => $nombre]);
        }

        $marcas = ['Sephora Collection', 'Fenty Beauty', 'Rare Beauty', 'Dior', 'Chanel', 'Charlotte Tilbury', 'Olaplex', 'The Ordinary', 'Tarte', 'Huda Beauty'];
        
        $nombresCosmetica = [
            'perfumes' => ['Perfume Floral', 'Eau de Parfum', 'Fragancia Cítrica', 'Bruma Corporal'],
            'skincare' => ['Crema Facial', 'Sérum Iluminador', 'Agua Micelar', 'Protector Solar', 'Tónico Equilibrante'],
            'makeup' => ['Paleta de Sombras', 'Labial Mate', 'Base de Maquillaje', 'Corrector', 'Máscara de Pestañas'],
            'cabello' => ['Aceite Capilar', 'Champú Reparador', 'Mascarilla Capilar', 'Acondicionador', 'Sérum Antifrizz'],
            'cuerpo' => ['Exfoliante Corporal', 'Gel de Ducha', 'Loción Hidratante', 'Manteca Corporal', 'Cepillo Exfoliante']
        ];

        $imagesByCategory = [
            'perfumes' => ['perfume1.avif', 'perfume2.avif', 'perfume3.webp', 'perfume4.avif', 'perfume5.avif', 'perfume6.avif', 'perfume7.webp', 'perfume8.avif', 'perfume9.avif', 'perfume10.webp'],
            'skincare' => ['medicube.avif', 'anua_toner.avif', 'aestura_kit.avif', 'eborean.avif'],
            'makeup' => ['makeup1.avif', 'makeup2.avif', 'makeup3.avif', 'makeup4.avif', 'makeup5.avif', 'makeup6.avif', 'makeup7.avif', 'makeup8.avif', 'makeup9.webp', 'makeup10.avif'],
            'cabello' => ['champu1.avif', 'champu2.avif', 'champu3.avif', 'champu4.avif', 'champu5.webp', 'champu6.avif', 'champu7.avif', 'champu8.avif', 'champu9.avif', 'champu10.webp'],
            'cuerpo' => ['cepillo1.webp', 'cepillo2.avif', 'cepillo3.jpg', 'cepillo4.avif', 'cepillo5.avif', 'cepillo6.avif', 'cepillo7.avif', 'cepillo8.webp', 'cepillo9.avif', 'cepillo10.avif'],
        ];

        for ($i = 0; $i < 50; $i++) {
            $cat = $categorias[array_rand($categorias)];
            $catName = $cat->nombre;
            
            $catImages = $imagesByCategory[$catName];
            $selectedImg = $catImages[array_rand($catImages)];

            $catProductNames = $nombresCosmetica[$catName];
            $selectedProductName = $catProductNames[array_rand($catProductNames)];

            $nombreCompleto = $marcas[array_rand($marcas)] . ' - ' . $selectedProductName;

            Producto::create([
                'nombre' => $nombreCompleto,
                'precio' => $faker->randomFloat(2, 5, 200),
                'img' => $selectedImg,
                'categoria_id' => $cat->id,
            ]);
        }
    }
}
