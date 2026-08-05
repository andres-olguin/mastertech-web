// MasterTech SpA - Módulo IoT & AgTech Firmware (ESP32 / FreeRTOS)
#include <stdio.h>

typedef struct {
    float soilMoisture;
    float ambientTemp;
    float phLevel;
} SensorData;

void read_telemetry_sensors(SensorData *data) {
    data->soilMoisture = 42.5f;
    data->ambientTemp = 21.3f;
    data->phLevel = 6.8f;
    printf("[MasterTech IoT] Humedad Suelo: %.1f%% | Temp: %.1fC | pH: %.1f\n", 
           data->soilMoisture, data->ambientTemp, data->phLevel);
}

int main(void) {
    SensorData currentField;
    read_telemetry_sensors(&currentField);
    return 0;
}