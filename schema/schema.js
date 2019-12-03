// schema defines data on the Graph like object types, relation between these object types, describes how to reach into graph to interact with data or mutate the data

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLID
} = graphql;
const fakePhotoDatabase = [
  {
    caption: 'aa',
    imageURL:
      'https://phongspho.s3.amazonaws.com/meal_images/20170620_161951.jpg',
    id: 6
  },
  {
    caption: 'aa',
    imageURL:
      'https://phongspho.s3.amazonaws.com/meal_images/20170620_164034.jpg',
    id: 7
  }
];

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  fields: () => ({
    id: { type: GraphQLInt },
    caption: { type: GraphQLString },
    imageURL: { type: GraphQLString }
  })
});

// root query describes how users can use the graph and grab data.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    photo: {
      type: PhotoType,
      // argument passed by user while making query
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // here we define how to get data from database source
        // this will return the  photo with id passed in argument passed by user
        console.log('aa');
        return fakePhotoDatabase.find(photo => photo.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
