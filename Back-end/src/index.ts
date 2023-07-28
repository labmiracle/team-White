import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import home from './routes/home';
import users from './routes/users';
import events from './routes/events';



const port = process.env.PORT || 5555;
const app = express();

app.use(express.json());

app.use(home);
app.use(users);
app.use(events);


app.listen(port, () => {
    console.log(`Hello world! Server up in port ${port}`);
})