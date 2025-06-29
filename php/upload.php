<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: *"); // Permitir acceso desde cualquier dominio
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Cabeceras permitidas


// upload.php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['img'])) {
    $uploadDir = 'uploads/'; // Directorio donde almacenarás los archivos
    $uploadFile = $uploadDir . basename($_FILES['img']['name']);

    // Verificar si el archivo ya existe y elminar la copia vieja
    if (file_exists($uploadFile)) {
        unlink($uploadFile);
    }

    // Verificar el tipo de archivo, por ejemplo, solo permitir imágenes
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($_FILES['img']['type'], $allowedMimeTypes)) {
        echo json_encode(['error' => 'Tipo de archivo no permitido.']);
        exit;
    }

    // Mover el archivo desde el directorio temporal a la carpeta de destino
    if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadFile)) {
        // Enviar la URL del archivo como respuesta
        echo json_encode(['fileUrl' => '/uploads/' . basename($_FILES['img']['name'])]);
    } else {
        echo json_encode(['error' => 'Error al mover el archivo.']);
    }
} else {
    echo json_encode(['error' => 'No se ha enviado ningún archivo.']);
}
?>
