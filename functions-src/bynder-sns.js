import * as contentful from "contentful-management";

const SPACE = "s64jgdakkdiy";
const ENV = "ALP-419";
const ACCESS_TOKEN = "CFPAT-DOR4U3VqLRmUJ9iR4pr72_I8QLozrpNWvwV-vpz73EE";

exports.handler = async (event, context) => {
  console.log("Event:");
  console.log(event);
  console.log("Context:");
  console.log(context);
  const client = contentful.createClient({
    accessToken: ACCESS_TOKEN
  });

  console.log(client);

  client.getSpace(SPACE).then(space => {
    return space.getEnvironment(ENV).then(env => {
      env.getEntry("xbfNdeuaosXI3yrdSwUUg").then(entry => {
        console.log(entry.fields.image);
        env.getAsset(entry.fields.image["en-US"].assetId).then(asset => {
          console.log(asset);
        });
      });
    });
  });

  return {
    statusCode: 200,
    body: "This is a bynder test"
  };
};
