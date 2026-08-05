# MasterTech SpA - Módulo de Informática Biomédica v1.0
def parse_hl7_message(hl7_str):
    """Parsea segmentos HL7 v2.x para integraciones hospitalarias."""
    segments = hl7_str.strip().split('\r')
    parsed_data = {}
    for segment in segments:
        fields = segment.split('|')
        parsed_data[fields[0]] = fields[1:]
    return parsed_data

if __name__ == "__main__":
    sample_hl7 = "MSH|^~\\&|HIS|HOSPITAL|PACS|RAD|20260803||ADT^A08|101|P|2.3\rPID|||123456||OLGUIN^ANDRES||20040101|M"
    print("[MasterTech BioEngine] Procesando trama HL7...")
    result = parse_hl7_message(sample_hl7)
    print(f"Paciente ID: {result['PID'][2]} - Nombre: {result['PID'][4]}")