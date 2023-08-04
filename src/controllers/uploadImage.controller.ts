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

export const uploadPrpertyImages = async (req, res) => {
  const propertyAgentId = req.user.user._id;
  const reqData = req.body;
  let imageCount = 0;
  const bucketName = 'elasticbeanstalk-ap-south-1-493063914377';

  aws.config.setPromisesDependency(null);
  aws.config.update({
    accessKeyId: 'AKIAXFTHGIOESPHERSNW',
    secretAccessKey: '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',
    region: 'ap-south-1',
  });

  // AWS configuration
  const s3 = new aws.S3();

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

  async function getNumberOfImagesInBucket(bucket) {
    try {
      const params = {
        Bucket: bucket,
        Delimiter: '/',
        Prefix: `b8rHomes/${propertyAgentId}/${reqData.propertyId}/photos/raw/`,
      };

      const objects = await s3.listObjects(params).promise();

      // Filter the objects based on image MIME types
      const imageObjects = objects.Contents.filter((obj) => {
        const mimeType = mime.getType(obj.Key);
        return mimeType && mimeType.startsWith('image/');
      });
      return imageObjects.length;
    } catch (error) {
      console.error('Error:', error);
      return 0;
    }
  }

  // Check if the bucket exists
  doesBucketExist(bucketName)
    .then((bucketExists) => {
      if (bucketExists) {
        // If the bucket exists, get the number of images
        return getNumberOfImagesInBucket(bucketName);
      } else {
        console.log(`Bucket '${bucketName}' does not exist.`);
        return 0;
      }
    })
    .then(async (numImages) => {
      imageCount = numImages;
      console.log(`Number of images in ${bucketName}: ${numImages}`);

      // Upload each file to S3
      const promises = req.files.map((file) => {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
          ACL: 'public-read',
          Bucket: bucketName, // Replace with your S3 bucket name
          Body: fileStream,
          Key: `b8rHomes/${propertyAgentId}/${reqData.propertyId}/photos/raw/${
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
          propertyAgentId,
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
