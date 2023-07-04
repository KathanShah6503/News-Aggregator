const express = require('express');
const client = require('./elasticsearch/client');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/results', async (req, res) => {
    const passedQuery = req.query.q;
    const passedFromdate = req.query.Fromdate;
    const passedToDate = req.query.toDate;
    const passedCategory = req.query.category;

    async function sendESRequest() {
        const body = await client.search({
            index: 'news_articles',
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                multi_match: {
                                    query: passedQuery,
                                    fields: ['headline', 'short_description'],
                                },
                            },
                        ],
                        filter: passedFromdate || passedToDate ? [
                            {
                                range: {
                                    "@timestamp": {
                                        gte: passedFromdate || undefined,
                                        lte: passedToDate || undefined,
                                    },
                                },
                            },
                        ] : undefined,           
                    },
                }
            }
        });
        res.json(body.hits.hits);
    }
    sendESRequest();
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));