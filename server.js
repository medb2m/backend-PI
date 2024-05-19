import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import errorHandler from './_middleware/error-handler.js'

// Chat imports
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handleSocketEvents } from './_helpers/socketManager.js'

//  Routes Imports
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import videoRoutes from './routes/video.routes.js'
import categoryRoutes from './routes/category.routes.js'
import blogRoutes from './routes/post.routes.js'
import claimRoutes from './routes/claim.routes.js'
import chatRoutes from './routes/chat.routes.js'
import quizRoutes from './routes/quiz.routes.js'
import certificateRoutes from './routes/certificate.routes.js'

// Express Init
const app = express();
// HTTP Server
const httpServer = createServer(app)
// Init Socket.io with the HTTP Server
const io = new Server(httpServer)


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"))
// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
//app.use(cors())

// Event config Chat
/* io.on('connection', (socket) => { 
    socket.on('send name', (username) => { 
        io.emit('send name', (username)); 
    }); 
  
    socket.on('send message', (chat) => { 
        io.emit('send message', (chat)); 
    }); 
});  */

// Socket Event Management
handleSocketEvents(io)

app.get('/', (req, res) => { 
    res.sendFile('C:/Users/medob/OneDrive/Desktop/PI/boilerplate/back-MegaLearn/index.html'); 
}); 

// Put routes here

app.use("/img" ,express.static("public/images"))


// auth routes
app.use('/user', userRoutes);
// course routes
app.use('/course', courseRoutes);
// video routes
app.use('/video', videoRoutes);
// category routes
app.use('/category', categoryRoutes);
// api Blog 
app.use('/blog', blogRoutes);
// Claim Routers 
app.use('/claim', claimRoutes);
// Chat Routers 
app.use('/chat', chatRoutes);
// Quiz Routers 
app.use('/quiz', quizRoutes);
// Certificate Routers 
app.use('/certificate', certificateRoutes);




// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
httpServer.listen(port, () => {
    console.log('Server listening on port ' + port);
});
