### nodejs-remote-control

- Default `http-server` port: 3000
- Default `ws-server` port: 8080

List of websocket commands:

- Navigation over the x and y axis
  - Move mouse up - arrow up
  - Move mouse down - arrow down
  - Move mouse left - arrow left
  - Move mouse right - arrow right
  - Send mouse coordinates - button `p`
- Drawing
  - Draw circle with pushed left button - button `c`
  - Draw rectangle with pushed left button - button `r`
  - Draw square with pushed left button - button `s`
- Print screen
  - Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position) - `left ctrl + p`
