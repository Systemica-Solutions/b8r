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

// pending all property images get // 6 images get by priority
export const getS3ImagesByPropertyId = async (data) => {
  const prefix = `https://${bucketName}.s3.ap-south-1.amazonaws.com/`;

  const fileData = await Promise.all(
    data.propertyId.map(async (property) => {
      property = property.toObject();
      const uploadParams = await AssignedProperty.findOne({
        propertyId: property._id,
      });
      let images: any = [];
      images = await getNumberOfImagesInBucket(
        bucketName,
        uploadParams.fieldAgentId,
        uploadParams.propertyId,
        'final'
      );
      const dummyImages = images.sort(imageRankingSort);
      console.log('images ', images, dummyImages.slice(0, 6));

      images.slice(0, 6).map(async (img) => {
        property.images.push(prefix.concat(img.Key));
      });

      return property;
    })
  );
  console.log('final sortImages====================================', fileData);
  return fileData;
};

function imageRankingSort(a, b) {
  const regex = /(\d+)\.PNG$/; // Regular expression to match the digits before ".PNG"
  const aMatch = a.Key.match(regex);
  const bMatch = b.Key.match(regex);
  if (aMatch && bMatch) {
    const aNumber = parseInt(aMatch[1]);
    const bNumber = parseInt(bMatch[1]);
    return aNumber - bNumber;
  }
  // If matching digits aren't found, maintain the original order
  return 0;
}

const sortByLastDigits = async (data) => {
  // console.log('data to be get..', data);

  console.log('data.... : ', data);

  if (data && data.length) {
    return await Promise.all(
      data.map(async (val) => {
        if (val.images && val.images.length) {
          const imgs = val.images.sort(async (a, b) => {
            const regex = /(\d+)\.PNG$/; // Regular expression to match the digits before ".PNG"
            const aMatch = a.match(regex);
            const bMatch = b.match(regex);

            if (aMatch && bMatch) {
              const aNumber = parseInt(aMatch[1]);
              const bNumber = parseInt(bMatch[1]);
              return aNumber - bNumber;
            }

            // If matching digits aren't found, maintain the original order
            return 0;
          });

          console.log('imgs11111110----------------', imgs);
          val.images = imgs.slice(0, 6);
        }
        return val;
      })
    );
  }
};
