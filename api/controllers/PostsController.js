/**
 * PostsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const posts = ['Mysuru Dasara Celebrations','Life of a developer']
let clients = [];

function brodcastPosts(post){
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(post)}\n\n`))
}

module.exports = {
  
    getposts : async function (req,res){
        return res.json(posts)
    },
    newPost: async function(req,res){
        posts.push(req.body.name);
        res.end('ok+')
        return brodcastPosts(req.body.name)
    },
    subscribeToPosts:function (req, res){
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

