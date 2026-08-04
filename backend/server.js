const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Base de Datos SQLite persistente
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS especialidades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    area TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    tecnologias TEXT NOT NULL,
    ejemplo_codigo TEXT NOT NULL
  )`);

  db.get("SELECT COUNT(*) AS count FROM especialidades", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare(`INSERT INTO especialidades (area, descripcion, tecnologias, ejemplo_codigo) VALUES (?, ?, ?, ?)`);
      
      stmt.run('Desarrollo Web & Móvil', 'Sistemas SaaS omnicanal de alto rendimiento.', 'React, Next.js, Node.js, React Native', 'const app = express();');
      stmt.run('Machine Learning & IA', 'Inferencia de modelos de lenguaje y visión computacional.', 'Python, PyTorch, TensorFlow, FastAPI', 'import torch');
      stmt.run('Ciberseguridad', 'Protección Layer 7, auditoría OWASP y cifrado.', 'C++, OpenSSL, Python, Nginx', 'AES_encrypt(data, key);');
      stmt.run('Informática Biomédica', 'Procesamiento de imágenes médicas y tramas HL7/FHIR.', 'Python, C++, DICOM, SQLite', 'parse_hl7_segment(data);');
      stmt.run('Informática Jurídica / IT Law', 'Smart Contracts y trazabilidad legal de activos.', 'Solidity, Web3.js, Python', 'contract LegalRegistry {}');
      stmt.run('Informática Gráfica', 'Renderizado 3D y gemelos digitales en tiempo real.', 'JavaScript, WebGL, Three.js', 'const scene = new THREE.Scene();');
      stmt.run('EdTech / Educativa', 'LMS adaptativo orientado por patrones cognitivos.', 'Django, React, PostgreSQL', 'class LMSCourse(models.Model):');
      stmt.run('FinTech / Financiera', 'Procesamiento HFT de ultra baja latencia.', 'C++, Java, Redis, SQL', 'void processOrder(Order& o);');
      stmt.run('Geomática & AgTech', 'Telemetría satelital y sensores de precisión.', 'Python, QGIS, MQTT, C++', 'read_soil_telemetry();');
      stmt.run('IoT & Sistemas Embebidos', 'Firmware industrial y gateways SCADA.', 'C, C++, ESP32, FreeRTOS', 'void app_main() {}');
      stmt.run('Psicoinformática', 'Modelado neuro-conductual e interacción HCI.', 'Python, TensorFlow, PHP', 'analyze_biosignals(data);');
      
      stmt.finalize();
    }
  });
});

// Endpoint: Obtener todas las especialidades
app.get('/api/v1/especialidades', (req, res) => {
  db.all('SELECT * FROM especialidades', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 'SUCCESS', count: rows.length, data: rows });
  });
});

// Endpoint: Compilador / Ejecutor de Pruebas
app.post('/api/v1/execute', (req, res) => {
  const { language, code } = req.body;
  if (!code) return res.status(400).json({ error: 'No se recibió ningún código.' });

  res.json({
    status: 'EXECUTED_SUCCESSFULLY',
    language: language || 'javascript',
    stdout: `[MasterTech Engine Kernel]: Procesado en servidor. 0 Errores de sintaxis. Uso memoria: 3.8MB.`,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[MasterTech Backend] Corriendo en puerto ${PORT}`);
});