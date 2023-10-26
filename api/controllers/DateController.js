/**
 * DateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    subscribeToDate: (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Send a welcome message to the client
        // res.write('data: Welcome to the SSE server\n\n');

        // Simulate sending updates every second
        const interval = setInterval(() => {
            const message = `data: Server time: ${new Date().toLocaleTimeString()}\n\n`;
            res.write(message);
        }, 1000);

        // Close the connection when the client disconnects
        req.on('close', () => {
            console.log('CLosing the req')
            clearInterval(interval);
        });
    }

};

