# ImaUp (Image Uploader)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![build status](https://api.travis-ci.org/Talento90/ima-up.svg)

ImaUp is a microservice responsible to upload images. 

**Features**

- Verifies image duplication by image hash
- Uses Hapi.js as Web Framework
- Swagger Documentation
- Tests using Lab
- MongoDb to store image info (using Mongoose)

**Configuration**

Set configurations in folder (configs/config.{env}.js)

- Image folder for images
- Database connection string
- Logs folder

**Installation Guide**

 - npm install 
 - run: gulp build (build babel and applies standard code rules)
 - run: gulp nodemon (applies standard code rules and runs babel)
 - run: gulp test (run tests using lab framework)


Api Example
---------------

**Get Image Data**

    curl -X GET --header "Accept: application/json" "http://localhost:3001/api/images/23915581-9d85-4af2-9245-fc5bb3b1757f"

**Get Image File**

    curl -X GET --header "Accept: application/json" "http://localhost:3001/api/images/23915581-9d85-4af2-9245-fc5bb3b1757f/file"

**Upload Image**

    POST http://localhost:3001/api/images HTTP/1.1
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryyqAicGnD3VHyAlgo
   
    ------WebKitFormBoundaryyqAicGnD3VHyAlgo
    Content-Disposition: form-data; name="image"; filename="example_image.png"
    Content-Type: image/png
    
    ...ImageBinay....
    
    ------WebKitFormBoundaryyqAicGnD3VHyAlgo--


