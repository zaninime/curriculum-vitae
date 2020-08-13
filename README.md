# Curriculum Vitae

My personal CV in HTML format. See the [live](https://francesco.zanini.me) page.

This project is based on a simple call to `ReactDOM.renderToStaticMarkup()`. Other than [React](https://reactjs.org/), it uses [styled-components](https://styled-components.com/) and [Tailwind CSS](https://tailwindcss.com/) for styling, and [fp-ts](https://github.com/gcanti/fp-ts) for some functional fanciness.

## Building

The build system is based on [Nix](https://nixos.org). Running `nix-build -A site` will give you a `result` symlink to the content of the website.

## Development

To keep it simple, no out-of-the-box solution is provided. Run the following commands to have a live version locally:

1. `make static` to update the local assets
2. `yarn install` followed by `tsc --watch`
3. In a new terminal window/pane, `nodemon src/index.js`
4. In a new terminal window/pane, `cd dist && python -m http.server`