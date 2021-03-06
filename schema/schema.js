// schema defines data on the Graph like object types, relation between these object types, describes how to reach into graph to interact with data or mutate the data

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const Photo = require('../models/photo');
// const fakePhotoDatabase = [
//   {
//     caption: 'aa',
//     imageURL:
//       'https://phongspho.s3.amazonaws.com/meal_images/20170620_161951.jpg',
//     id: 6
//   },
//   {
//     caption: 'aa',
//     imageURL:
//       'https://phongspho.s3.amazonaws.com/meal_images/20170620_164034.jpg',
//     id: 7
//   }
// ];

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
        return fakePhotoDatabase.find(photo => photo.id === args.id);
      }
    },
    photos: {
      type: new GraphQLList(PhotoType),
      resolve() {
        return fakePhotoDatabase;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPhoto: {
      type: PhotoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        caption: { type: new GraphQLNonNull(GraphQLString) },
        imageURL: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const photo = new Photo({
          id: args.id,
          caption: args.caption,
          imageURL: args.imageURL
        });
        console.log('saving');
        return photo.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
