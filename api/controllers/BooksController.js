/**
 * BooksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const books = ['Book1','Book2'];
let clients = [];

function brodcastBooks(book){
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(book)}\n\n`))
}

module.exports = {
  
    getBooks : async function (req,res){
        console.log('Get Books req')
        return res.json(books)
    },
    postBook: async function(req,res){
        books.push(req.body.name);
        console.log('Broadcasting books')
        res.end('ok+')
        return brodcastBooks(req.body.name)
    },
    subscribeToBooks:function (req, res){
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Send a welcome message to the client
        res.write('data: Welcome to the SSE server\n\n');

        // Simulate sending updates every second
        // const interval = setInterval(() => {
        //     const message = `data: Server time: ${new Date().toLocaleTimeString()}\n\n`;
        //     res.write(message);
        // }, 1000);

        const clientId = new Date().getMilliseconds()
        const newClient = {
            id: clientId,
            res
        }
        clients.push(newClient)

        // Close the connection when the client disconnects
        req.on('close', () => {
            console.log('CLosing the req')
            clients = clients.filter(client=>client.id !== clientId)
            // clearInterval(interval);
        });
    }

};

