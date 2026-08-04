// ================================================================
// MASTERTECH SpA - BACKEND CORPORATIVO v2.0 (better-sqlite3)
// ================================================================
const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a SQLite con better-sqlite3 (síncrono, sin callbacks)
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Crear tabla si no existe
db.prepare(`
    CREATE TABLE IF NOT EXISTS especialidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        area TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        tecnologias TEXT NOT NULL,
        ejemplo_codigo TEXT NOT NULL
    )
`).run();

// Insertar datos semilla si la tabla está vacía
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
    const insertMany = db.transaction((items) => {
        for (const item of items) insert.run(...item);
    });
    insertMany(especialidades);
    console.log('[DB] Datos semilla insertados.');
}

// Endpoint de salud
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'MasterTech Backend', timestamp: new Date().toISOString() });
});

// Endpoint para listar especialidades
app.get('/api/v1/especialidades', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM especialidades ORDER BY id ASC').all();
        res.json({ status: 'SUCCESS', count: rows.length, data: rows });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
});

// Endpoint para ejecutar código (simulado)
app.post('/api/v1/execute', (req, res) => {
    const { language = 'javascript', code } = req.body;
    if (!code || typeof code !== 'string') {
        return res.status(400).json({ status: 'ERROR', message: 'El campo "code" es requerido.' });
    }
    // Simulación de ejecución
    const response = {
        status: 'EXECUTED_SUCCESSFULLY',
        language,
        stdout: `[MasterTech Kernel] Código procesado (${code.length} bytes). Sin errores.`,
        timestamp: new Date().toISOString(),
        memory_usage: `${(3.2 + Math.random() * 1.5).toFixed(1)} MB`,
        cpu_time: `${(0.001 + Math.random() * 0.005).toFixed(3)} s`
    };
    if (code.toLowerCase().includes('error')) {
        response.status = 'EXECUTION_ERROR';
        response.stdout = 'RuntimeError: Simulación de error.';
    }
    res.json(response);
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ status: 'ERROR', message: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'ERROR', message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`[MasterTech Backend] Corriendo en puerto ${PORT}`);
});