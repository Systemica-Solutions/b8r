import aws from 'aws-sdk';
import fs from 'fs';
import { failureResponse, successResponse } from '../helpers/api-response.helper';
import PropertyPhotos from '../models/propertyPhotos.model';

export const uploadImages = async (req, res) => {
    const userId = req.user.user._id;
    const reqData = req.body;

    aws.config.setPromisesDependency(null);
    aws.config.update({
        accessKeyId: 'AKIAXFTHGIOESPHERSNW',
        secretAccessKey: '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',
        region: 'ap-south-1'
    });

      // AWS configuration
    const s3 = new aws.S3();
 
    if (!req.files || req.files.length === 0) {
        return failureResponse(res, 400, [], 'No files were uploaded.');
    }

     // Upload each file to S3
    const promises = req.files.map((file) => {
      const fileStream = fs.createReadStream(file.path);
      const uploadParams = {
        ACL: 'public-read',
        Bucket: 'elasticbeanstalk-ap-south-1-493063914377', // Replace with your S3 bucket name
        Body: fileStream,
        Key: `Property/${reqData.fieldAgentId}/${reqData.propertyId}/raw/${Date.now()}-${file.originalname}`
      };
      return s3.upload(uploadParams).promise();
    });

      // Wait for all uploads to complete
    const fileData = await Promise.all(promises).then((data) => {
        // Clean up temporary files
        req.files.forEach((file) => fs.unlinkSync(file.path));
        return data;
        // return successResponse(res, 200, data, 'File uploaded successfully.');
      }).catch((error) => {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    });

    if (fileData && fileData.length) {
        console.log('fileData', fileData);
        // store data in model
        const imageURL = [];
        fileData.forEach(obj => imageURL.push(obj.Location));
        const dataObj = {
            photos: imageURL,
            propertyId: reqData.propertyId,
            userId
        };
        const propertyObj = new PropertyPhotos(dataObj);
        const saveObj = await propertyObj.save();
        return successResponse(res, 200, saveObj, 'File uploaded successfully.');
    }
};






