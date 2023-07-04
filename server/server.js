const { Client } = require('@elastic/elasticsearch');
const express = require('express');
const client = require('./elasticsearch/client');
const cors = require('cors'); // Cross-Origin Resource Sharing

const app = express();

app.use(cors());              //enable all CORS requests

//create an endpoint to handle http GET requests
app.get('/results', async (req, res) => {
    // const { q, fromDate, toDate } = req.query;
    //constants for the user's search query 
    const passedQuery = req.query.q;
    const passedFromDate = req.query.fromDate;
    const passedToDate = req.query.toDate;

    //function to send the user's search query to elastic cloud
    async function sendESRequest() {
        const body = await client.search({
            //index name
            index: 'news_articles',
            body: {
                size: 100,
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
                        filter: [
                            ...(passedFromdate || passedToDate
                              ? [
                                  {
                                    range: {
                                      '@timestamp': {
                                        gte: passedFromdate || undefined,
                                        lte: passedToDate || undefined,
                                      },
                                    },
                                  },
                                ]
                              : []),
                            ...(passedCategory
                              ? [
                                  {
                                    terms: {
                                      category: passedCategory,
                                    },
                                  },
                                ]
                              : []),
                          ],           
                    },
                }
            }
        });
        res.json(body.hits.hits);
    }
    sendESRequest();
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));