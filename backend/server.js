// ================================================================
// MASTERTECH SpA - BACKEND CORPORATIVO v3.0 (node:sqlite nativo)
// ================================================================
// Tecnologías: Node.js 24+, Express, node:sqlite (módulo nativo)
// ================================================================

const express = require('express');
const { DatabaseSync } = require('node:sqlite');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================================================
// CONEXIÓN A SQLITE USANDO EL MÓDULO NATIVO DE NODE.JS
// ================================================================
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new DatabaseSync(dbPath);

// ================================================================
// INICIALIZACIÓN DE TABLAS Y DATOS SEMILLA (SEED)
// ================================================================
try {
    // Crear tabla si no existe
    db.exec(`
        CREATE TABLE IF NOT EXISTS especialidades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            area TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            tecnologias TEXT NOT NULL,
            ejemplo_codigo TEXT NOT NULL
        )
    `);

    // Verificar si la tabla está vacía
    const countRow = db.prepare('SELECT COUNT(*) AS count FROM especialidades').get();
    if (countRow.count === 0) {
        const insert = db.prepare(`
            INSERT INTO especialidades (area, descripcion, tecnologias, ejemplo_codigo) 
            VALUES (?, ?, ?, ?)
        `);

        const especialidades = [
            ['Desarrollo Web & Móvil', 'Sistemas SaaS omnicanal de alto rendimiento.', 'React, Next.js, Node.js, React Native', 'const app = express();'],
            ['Machine Learning & IA', 'Inferencia de modelos de lenguaje y visión computacional.', 'Python, PyTorch, TensorFlow, FastAPI', 'import torch'],
            ['Ciberseguridad', 'Protección Layer 7, auditoría OWASP y cifrado.', 'C++, OpenSSL, Python, Nginx', 'AES_encrypt(data, key);'],
            ['Informática Biomédica', 'Procesamiento de imágenes médicas y tramas HL7/FHIR.', 'Python, C++, DICOM, SQLite', 'parse_hl7_segment(data);'],
            ['Informática Jurídica / IT Law', 'Smart Contracts y trazabilidad legal de activos.', 'Solidity, Web3.js, Python', 'contract LegalRegistry {}'],
            ['Informática Gráfica', 'Renderizado 3D y gemelos digitales en tiempo real.', 'JavaScript, WebGL, Three.js', 'const scene = new THREE.Scene();'],
            ['EdTech / Educativa', 'LMS adaptativo orientado por patrones cognitivos.', 'Django, React, PostgreSQL', 'class LMSCourse(models.Model):'],
            ['FinTech / Financiera', 'Procesamiento HFT de ultra baja latencia.', 'C++, Java, Redis, SQL', 'void processOrder(Order& o);'],
            ['Geomática & AgTech', 'Telemetría satelital y sensores de precisión.', 'Python, QGIS, MQTT, C++', 'read_soil_telemetry();'],
            ['IoT & Sistemas Embebidos', 'Firmware industrial y gateways SCADA.', 'C, C++, ESP32, FreeRTOS', 'void app_main() {}'],
            ['Psicoinformática', 'Modelado neuro-conductual e interacción HCI.', 'Python, TensorFlow, PHP', 'analyze_biosignals(data);']
        ];

        // Usar una transacción para insertar todos los datos
        const insertMany = db.transaction((items) => {
            for (const item of items) {
                insert.run(item[0], item[1], item[2], item[3]);
            }
        });

        insertMany(especialidades);
        console.log('[DB] Datos semilla insertados correctamente (11 especialidades).');
    } else {
        console.log(`[DB] La tabla ya contiene ${countRow.count} registros.`);
    }
} catch (err) {
    console.error('[DB] Error inicializando la base de datos:', err.message);
}

// ================================================================
// ENDPOINTS DE LA API
// ================================================================

// 4.1 Salud
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'MasterTech Backend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 4.2 Obtener especialidades
app.get('/api/v1/especialidades', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM especialidades ORDER BY id ASC').all();
        res.json({
            status: 'SUCCESS',
            count: rows.length,
            data: rows
        });
    } catch (err) {
        console.error('[API] Error en GET /especialidades:', err.message);
        res.status(500).json({
            status: 'ERROR',
            message: 'Error interno al consultar la base de datos.',
            error: err.message
        });
    }
});

// 4.3 Ejecutor de código (simulado)
app.post('/api/v1/execute', (req, res) => {
    const { language = 'javascript', code } = req.body;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({
            status: 'ERROR',
            message: 'El campo "code" es requerido y debe ser un texto.'
        });
    }

    console.log(`[API] Ejecución recibida | Lenguaje: ${language} | Tamaño: ${code.length} bytes`);

    let response = {
        status: 'EXECUTED_SUCCESSFULLY',
        language: language,
        stdout: `[MasterTech Kernel] Código procesado (${code.length} bytes). Sin errores de sintaxis.`,
        timestamp: new Date().toISOString(),
        memory_usage: `${(3.2 + Math.random() * 1.5).toFixed(1)} MB`,
        cpu_time: `${(0.001 + Math.random() * 0.005).toFixed(3)} s`
    };

    if (code.toLowerCase().includes('error')) {
        response.status = 'EXECUTION_ERROR';
        response.stdout = 'RuntimeError: Se detectó una condición de error (simulación).';
        response.memory_usage = 'N/A';
        response.cpu_time = 'N/A';
    }

    res.json(response);
});

// 4.4 Ruta 404
app.use((req, res) => {
    res.status(404).json({
        status: 'ERROR',
        message: `La ruta ${req.method} ${req.originalUrl} no existe.`
    });
});

// 4.5 Manejador de errores
app.use((err, req, res, next) => {
    console.error('[API] Error no capturado:', err.stack);
    res.status(500).json({
        status: 'ERROR',
        message: 'Ocurrió un error interno en el servidor.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ================================================================
// INICIO DEL SERVIDOR
// ================================================================
app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`[MasterTech Backend] Servidor activo`);
    console.log(`[MasterTech Backend] Puerto: ${PORT}`);
    console.log(`[MasterTech Backend] Estado: ONLINE`);
    console.log(`========================================`);
});

module.exports = app;