# Simpler Server
### Upload a file
curl --location --request POST 'http://localhost:8000/upload' \
--form 'file-key=@"/file/path/Downloads/sample-image.png"'

### List all uploaded files
curl --location --request GET 'http://localhost:8000/upload'
