const AWS = require("aws-sdk");
const csv = require("csv-parser");

const s3 = new AWS.S3(
  {
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
  }
);

const getSignedUrlPromise = (params) =>
  new Promise((resolve, reject) =>
    s3.getSignedUrl("putObject", params, (error, url) => {
      if (error) {
        reject(error);
      }
      resolve(url);
    })
  );

const parseS3Stream = (s3Stream) => {
  const results = [];

  return new Promise((resolve, reject) => {
    s3Stream
      .pipe(csv())
      .on("error", (error) => reject(error))
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
};

async function importProductsFile(event) {
  const { fileName } = event.pathParameters;

  const params = {
    Bucket: "csv-parser-bucket-2023",
    Key: `uploaded/${fileName}`,
    ContentType: "text/csv",
    Expires: 3600,
  };

  try {
    const url = await getSignedUrlPromise(params);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: url,
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
}

async function importFileParser(event) {
  console.log("SQS_URL", process.env.SQS_URL);
  const sqs = new AWS.SQS();

  for (const record of event.Records) {
    const params = {
      Bucket: process.env.IMPORT_BUCKET,
      Key: record.s3.object.key,
    };

    const s3Stream = s3.getObject(params).createReadStream();

    try {
      const parsedCsv = await parseS3Stream(s3Stream);
      console.log("parsedCsv", parsedCsv);
      for (const product of parsedCsv) {
        const params = {
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(product),
        };
        console.log('params', params);
        const res = await sqs.sendMessage(params).promise();
        console.log(res)
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  importProductsFile,
  importFileParser,
};
