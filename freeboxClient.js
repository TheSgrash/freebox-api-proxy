import { Freebox } from 'freebox';
import fs from 'fs/promises';
import freebox_api_config from './settings.js';

class FreeboxClient {
  constructor() {
    this.freebox = new Freebox(freebox_api_config)
  }

  async initialize() {
    try {
      // Load existing session token if available
      try {
        const sessionToken = await fs.readFile('session_token.txt', 'utf8');
        this.freebox.session_token = sessionToken.trim();
      } catch {}
      
      await this.freebox.login();
      
      // Save session token for future use
      await fs.writeFile('session_token.txt', this.freebox.session_token);
      console.log('Connected to Freebox');
    } catch (error) {
      console.error('Freebox connection error:', error);
      throw new Error('Failed to connect to Freebox');
    }
  }

  async getPortForwardings() {
    const response = await this.freebox.get('fw/redir/');
    return response.data.result;
  }

  async togglePortForwarding(id, enable) {
    const response = await this.freebox.put(`fw/redir/${id}`, {
      enabled: enable
    });
    return response.data.result;
  }

  async getStaticLeases() {
    const response = await this.freebox.get('dhcp/static_lease/');
    return response.data.result;
  }
}

export default FreeboxClient;
