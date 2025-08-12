import express from 'express';
import FreeboxClient from './freeboxClient.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const freeboxClient = new FreeboxClient();

// Connect to Freebox on startup
freeboxClient.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Initialization failed:', err);
  process.exit(1);
});

// List port forwardings
app.get('/port_forwardings', async (req, res) => {
  try {
    const forwardings = await freeboxClient.getPortForwardings();
    res.json(forwardings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enable port forwarding
app.post('/port_forwardings/:id/enable', async (req, res) => {
  try {
    const result = await freeboxClient.togglePortForwarding(req.params.id, true);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Disable port forwarding
app.post('/port_forwardings/:id/disable', async (req, res) => {
  try {
    const result = await freeboxClient.togglePortForwarding(req.params.id, false);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List static leases
app.get('/static_leases', async (req, res) => {
  try {
    const leases = await freeboxClient.getStaticLeases();
    res.json(leases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
