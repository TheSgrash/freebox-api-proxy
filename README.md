# Freebox/Iliadbox APIs Proxy App

NodeJS app exposing ReST APIs to read/set data on Iliadbox/Freebox routers.
It handles the authentication process (even if first time, there is the need for a manual button press on the router) at every call.

## Setup Instructions

**Install Dependencies:**

```bash
npm install
```

**Settings file:**

The file `settings.json` must contain following JSON structure (you can use the `settings_template.json` as reference).. you can retrieve some of the needed info from the url `<ip_of_your_router>:<api_port>/api_version` 

```json
{
  "app_id"        : "yourdomain.iliadboxos",
  "app_domain"    : "",
  "app_token"     : "token_here",
  "app_name"      : "You App Name",
  "app_version"   : "0.0.1",
  "api_domain"    : "**********.ibxos.it",
  "api_base_url"  : "/api/",
  "api_version"   : "12.1",
  "https_port"    : 11532,
  "device_name"   : "Give a name to this device"
}

export default freebox_api_config;
```


**Run app locally:**

```bash
npm start
```

**First Run Authorization:**

On first run, check your Freebox LCD screen to authorize the connection

The Node.js app will store credentials for future sessions


## Building and Running with Docker

```bash
# Build the image
docker build -t freebox-api-proxy .

# Create a persistent volume
docker volume create freebox-data

# Run the container
docker run -d \
  -p 3000:3000 \
  -v freebox-data:/data \
  --name freebox-proxy \
  freebox-api-proxy
```
