import aws from 'aws-sdk';
import fs from 'fs';
import { failureResponse, successResponse } from '../helpers/api-response.helper';

// export const upload = (req, res) => {
//     aws.config.setPromisesDependency(null);
//     aws.config.update({
//         accessKeyId: 'AKIAXFTHGIOESPHERSNW',
//         secretAccessKey: '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',
//         region: 'ap-south-1'
//       });

//       // AWS configuration
//     const s3 = new aws.S3();

//     if (!req.files || req.files.length === 0) {
//         return failureResponse(res, 400, [], 'No files were uploaded.');
//     }

//       // Upload each file to S3
//     const promises = req.files.map((file) => {
//       const fileStream = fs.createReadStream(file.path);
//       const uploadParams = {
//         ACL: 'public-read',
//         Bucket: 'elasticbeanstalk-ap-south-1-493063914377', // Replace with your S3 bucket name
//         Key: file.originalname,
//         Body: fileStream,
//       };
//       return s3.upload(uploadParams).promise();
//       });

//       // Wait for all uploads to complete
//     Promise.all(promises).then((data) => {
//         // Clean up temporary files
//         req.files.forEach((file) => fs.unlinkSync(file.path));
//         return successResponse(res, 200, data, 'File uploaded successfully.');
//       }).catch((error) => {
//         return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
//       });
// };






