// MasterTech SpA - Módulo FinTech HFT (High-Frequency Trading) Kernel
#include <iostream>
#include <chrono>

struct Order {
    uint64_t id;
    double price;
    uint32_t quantity;
    bool isBuy;
};

class MatchingEngine {
public:
    void processOrder(const Order& order) {
        auto start = std::chrono::high_resolution_clock::now();
        // Calce de órdenes de ultra alta velocidad
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> latency = end - start;
        std::cout << "[MasterTech FinTech] Orden ID " << order.id 
                  << " procesada en " << latency.count() << " ms\n";
    }
};

int main() {
    MatchingEngine engine;
    engine.processOrder({1001, 150.25, 500, true});
    return 0;
}