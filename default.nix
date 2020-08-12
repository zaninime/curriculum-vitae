let
  sources = import ./nix/sources.nix;
  gitignore = self: super: import sources.gitignore { lib = super.lib; };
  pins = self: super: { nodejs = super.nodejs-14_x; };
  repo = self: super: {
    site = self.callPackage ./nix/site.nix { };
    deployScript = self.callPackage ./nix/deploy.nix { };
    netlify = super.linkFarm "netlify" [{
      name = "bin/netlify";
      path = "${self.site.nodeModules}/node_modules/.bin/netlify";
    }];
  };
in import sources.nixpkgs { overlays = [ gitignore pins repo ]; }
