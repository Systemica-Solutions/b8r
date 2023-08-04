import aws from 'aws-sdk';
import fs from 'fs';
import {
  failureResponse,
  successResponse,
} from '../helpers/api-response.helper';
import PropertyPhotos from '../models/propertyPhotos.model';
import AssignedProperty from '../models/assignedProperty.model';
import { Types } from 'mongoose';
const mime = require('mime');

aws.config.setPromisesDependency(null);
aws.config.update({
  accessKeyId: 'AKIAXFTHGIOESPHERSNW',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

// AWS configuration
const s3 = new aws.S3();
const bucketName = 'elasticbeanstalk-ap-south-1-493063914377';

export const uploadPrpertyImages = async (req, res) => {
  const fieldAgentId = req.user.user._id;
  const reqData = req.body;
  let imageCount = 0;

  if (!req.files || req.files.length === 0) {
    return failureResponse(res, 400, [], 'No files were uploaded.');
  }

  // Function to check if a bucket exists
  async function doesBucketExist(bucket) {
    try {
      const params = {
        Bucket: bucket,
      };
      await s3.headBucket(params).promise();
      return true;
    } catch (error) {
      if (error.statusCode === 404) {
        return false;
      }
      throw error;
    }
  }

  // Check if the bucket exists
  doesBucketExist(bucketName)
    .then((bucketExists) => {
      if (bucketExists) {
        // If the bucket exists, get the number of images
        return getNumberOfImagesInBucket(
          bucketName,
          fieldAgentId,
          reqData.propertyId,
          'raw'
        );
      } else {
        console.log(`Bucket '${bucketName}' does not exist.`);
        return 0;
      }
    })
    .then(async (numImages: any) => {
      imageCount = numImages.length;
      console.log(`Number of images in ${bucketName}: ${numImages}`);

      // Upload each file to S3
      const promises = req.files.map((file) => {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
          ACL: 'public-read',
          Bucket: bucketName, // Replace with your S3 bucket name
          Body: fileStream,
          Key: `b8rHomes/${fieldAgentId}/${reqData.propertyId}/photos/raw/${
            reqData.propertyId
          }-${++imageCount}.${file.originalname.split('.').pop()}`,
        };
        return s3.upload(uploadParams).promise();
      });

      // Wait for all uploads to complete
      const fileData = await Promise.all(promises)
        .then((data) => {
          // Clean up temporary files
          req.files.forEach((file) => fs.unlinkSync(file.path));
          return data;
          // return successResponse(res, 200, data, 'File uploaded successfully.');
        })
        .catch((error) => {
          return failureResponse(
            res,
            error.status || 500,
            error,
            error.message || 'Something went wrong'
          );
        });

      if (fileData && fileData.length) {
        // store data in model
        const imageURL = [];
        fileData.forEach((obj) => imageURL.push(obj.Location));
        const dataObj = {
          photos: imageURL,
          propertyId: reqData.propertyId,
          fieldAgentId,
        };
        const propertyObj = new PropertyPhotos(dataObj);
        const saveObj: any = await propertyObj.save();

        const imageModelId = new Types.ObjectId(saveObj.propertyId);
        // Store property photos id in assign property table
        const updateObj = await AssignedProperty.findOneAndUpdate(
          { propertyId: imageModelId },
          { $set: { propertyImageId: saveObj._id } },
          { new: true }
        );
        return successResponse(
          res,
          200,
          saveObj,
          'File uploaded successfully.'
        );
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

async function getNumberOfImagesInBucket(bucket, faId, propId, status) {
  try {
    const params = {
      Bucket: bucket,
      Delimiter: '/',
      Prefix: `b8rHomes/${faId}/${propId}/photos/${status}/`,
    };

    const objects = await s3.listObjects(params).promise();
    // Filter the objects based on image MIME types
    const imageObjects = objects.Contents.filter((obj) => {
      const mimeType = mime.getType(obj.Key);
      return mimeType && mimeType.startsWith('image/');
    });
    return imageObjects;
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
}


//pending all property images get // 6 images get by priority
export const getS3ImagesByPropertyId = async (data) => {
  const fileData = await Promise.all(data.propertyId.map(async (property) => {
    const uploadParams =   await AssignedProperty.findOne({
      propertyId: property._id,
    });
    return data.images = await getNumberOfImagesInBucket(
      bucketName,
      uploadParams.fieldAgentId,
      uploadParams.propertyId,
      'final'
    );
  }));
  // const fileData = await Promise.all(promises);
  console.log('fileData====================================');
  console.log(fileData);
  console.log('====================================');
  // .then((result) => {
  //   console.log('====================================');
  //   console.log(result);
  //   console.log('====================================');
  //   // Clean up temporary files
  //   // req.files.forEach((file) => fs.unlinkSync(file.path));
  //   return result;
  //   // return successResponse(res, 200, data, 'File uploaded successfully.');
  // })
  // .catch((error) => {
  //   return failureResponse(
  //     error,
  //     error.status || 500,
  //     error,
  //     error.message || 'Something went wrong'
  //   );
  // });

  // console.log('fileData====================================');
  // console.log(fileData);
  // console.log('====================================');

  // const prop = await AssignedProperty.findOne({
  //   propertyId: data.propertyId[0]._id,
  // });
  // return getNumberOfImagesInBucket(
  //   bucketName,
  //   prop.fieldAgentId,
  //   prop.propertyId,
  //   'final'
  // );
};
