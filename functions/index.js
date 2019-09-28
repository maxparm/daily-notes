'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const gcs = require('@google-cloud/storage')();
// const spawn = require('child-process-promise').spawn;

admin.initializeApp(functions.config().firebase);

/**
 * This Function updates the `/journal/$id/lastUpdated` with the timestamp of the last write to `/journal/$id/today`.
 */
// exports.lastUpdated = functions.database.ref('/journal/{id}/today').onWrite((event) => {
//   return event.data.ref.parent.child('lastUpdated').set(event.timestamp);
// });

// exports.cleanupImages = functions.database.ref('/dailyNotes/{userId}/{noteId}/html').onWrite((event) => {
//   // list images

//   // get images in html
//   return new Promise((resolve, reject) => {
//     require('jsdom').env('', function (err, window) {
//       if (err) {
//         reject(err);
//       }
//       const $ = require('jquery')(window);
//       const html = event.data.val();
//       const images = $('<div/>').html(html).find('img');
//       console.log(images.length);
//       images.each((i, image) => {
//         console.log(image.src);
//       });
//       resolve();
//     });
//   });
// });

// exports.resizeFile = functions.storage.object().onChange(event => {
//   const object = event.data; // The Storage object.
//   const fileBucket = object.bucket; // The Storage bucket that contains the file.
//   const filePath = object.name; // File path in the bucket.
//   const contentType = object.contentType; // File content type.
//   const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exits' (for file/folder deletions).
//   // [END eventAttributes]

//   // [START stopConditions]
//   // Exit if this is triggered on a file that is not an image.
//   if (!contentType.startsWith('image/')) {
//     console.log('This is not an image.');
//     return;
//   }

//   // Get the file name.
//   const fileName = filePath.split('/').pop();
//   if (fileName.startsWith('thumb_')) {
//     console.log('Already a Thumbnail.');
//     return;
//   }

//   // Exit if this is a move or deletion event.
//   if (resourceState === 'not_exists') {
//     console.log('This is a deletion event.');
//     return;
//   }

//   // Download file from bucket.
//   const bucket = gcs.bucket(fileBucket);
//   const tempFilePath = `/tmp/${fileName}`;
//   return bucket.file(filePath).download({
//     destination: tempFilePath
//   }).then(() => {
//     console.log('Image downloaded locally to', tempFilePath);
//     // Generate a thumbnail using ImageMagick.
//     return spawn('convert', [tempFilePath, '-quality', '85%', '-strip', '-interlace', 'Plane', tempFilePath]).then(() => {
//       console.log('Thumbnail created at', tempFilePath);
//       // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
//       const thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, `$1thumb_$2`);
//       // delete previous image
//       bucket.delete(filePath);
//       // Uploading the thumbnail.
//       return bucket.upload(tempFilePath, {destination: thumbFilePath});
//     });
//   });
//   // [END thumbnailGeneration]
// });
// // [END generateThumbnail]
