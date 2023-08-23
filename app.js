const express = require('express');
const { driver } = require('./config');

const app = express();

app.get('/api/answer', async (req, res) => {
  const query = req.query.q;

  const session = driver.session();
  const result = await session.run(`
    MATCH (e:Employee)-[:SIGNED]->(c:Contract)
    WHERE e.name = $name
    RETURN c.name AS contract
  `, { name: query });

  const contracts = result.records.map(record => record.get('contract'));

  session.close();

  res.json({ answer: contracts });
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
