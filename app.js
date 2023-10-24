const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express();
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Query {
            events: [String!]!
        }
        type Mutation {
            createEvent(name: String): String
        }
        schema {
            query: Query
            mutation: Mutation
        }
    `),
    rootValue: {
        events: () => {
            return ['event1', 'event2'];
        },
        createEvent: (args) => {
            const name = args.name;
            return name;
        }
    },
    graphiql: true
}))

app.listen(3000);