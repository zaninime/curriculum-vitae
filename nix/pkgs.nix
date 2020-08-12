let
  sources = import ./sources.nix;
  pins = self: super: { nodejs = super.nodejs-14_x; };
in import sources.nixpkgs { overlays = [ pins ]; }
