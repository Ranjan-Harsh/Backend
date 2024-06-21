import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const dbFile = 'db.json';

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

app.get('/ping', (req, res) => {
    res.send(true);
});

app.post('/submit', (req, res) => {
    const newSubmission: Submission = req.body;
    let submissions: Submission[] = [];

    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf-8');
        submissions = JSON.parse(data);
    }

    submissions.push(newSubmission);
    fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));

    res.send({ message: 'Submission saved successfully' });
});

app.get('/read', (req, res) => {
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf-8');
        const submissions: Submission[] = JSON.parse(data);

        const index = req.query.index;

        if (index !== undefined) {
            const idx = parseInt(index as string, 10);
            if (idx >= 0 && idx < submissions.length) {
                res.send(submissions[idx]);
            } else {
                res.status(404).send({ message: 'Submission not found' });
            }
        } else {
            res.send(submissions); // Return all submissions
        }
    } else {
        res.status(404).send({ message: 'No submissions found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
