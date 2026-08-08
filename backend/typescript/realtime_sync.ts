import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

interface DashboardState {
    activeLeads: number;
    conversionRate: number;
    revenue: number;
}

let globalState: DashboardState = {
    activeLeads: 0,
    conversionRate: 0.0,
    revenue: 0
};

wss.on('connection', (ws: WebSocket) => {
    ws.send(JSON.stringify({ type: 'INIT_STATE', payload: globalState }));

    ws.on('message', (message: string) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'LEAD_CAPTURED') {
                globalState.activeLeads += 1;
                globalState.revenue += data.value || 0;
                globalState.conversionRate = calculateConversion(globalState.activeLeads);
                
                broadcastState();
            }
        } catch (error) {
            ws.send(JSON.stringify({ type: 'ERROR', payload: 'Invalid payload structure' }));
        }
    });
});

function broadcastState() {
    const payload = JSON.stringify({ type: 'STATE_UPDATE', payload: globalState });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    });
}

function calculateConversion(leads: number): number {
    return leads > 0 ? Math.min((leads * 0.05), 1.0) : 0.0;
}

server.listen(8080, () => {
    console.log('Real-time synchronization server operational on port 8080');
});
