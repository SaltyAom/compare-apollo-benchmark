const { ApolloServer, gql } = require('apollo-server')

const products = require('./products.json')

const typeDefs = gql`
	type Product {
		name: String
		kind: String
		technical: String
		color: String
		storage: Int
	}

	type Query {
		getAllProduct: [Product!]!
		getProductBy(name: String!): Product
	}
`

const resolvers = {
	Query: {
		getAllProduct: () => products,
		getProductBy: (parent, args, context, info) =>
			products.find((product) => product.name.includes(args.name))
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`)
})
