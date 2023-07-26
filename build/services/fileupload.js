// const AWS = require('aws-sdk')
// async function uploadFile() {
//     //input your access details here
//     const ACCESS_KEY_ID = "AKIA36UWQAPGEZ7NGXVP"
//     const SECRET_ACCESS_KEY = "61o0/c7KjAFMfRE9rKqUsmYk5fSxcS9EX5pw8EAJ"
//     const BUCKET_NAME = "fanease"
//     //connecting to s3 storage
//     var storage = new AWS.S3({
//         accessKeyId: ACCESS_KEY_ID,
//         secretAccessKey: SECRET_ACCESS_KEY,
//         endpoint: new AWS.Endpoint("https://s3.pilw.io")
//     })
//     //Key is full path where to we upload file
//     //Body is content of file itself
//     //in this example we just use "Hello world" string as file content
//     var params = {
//         Key: 'text.txt',
//         Body: 'Hello world!',
//         Bucket: BUCKET_NAME
//     }
//     //example of upload function
//     //see aws-sdk for more details
//     storage.upload(params, function(err, data) {
//         if (err) {
//             throw err
//         }
//         console.log(`File uploaded successfully. ${data.Location}`)
//     })                                                           
// }
// module.exports = {
//     uploadFile,
//  }
//# sourceMappingURL=fileupload.js.map