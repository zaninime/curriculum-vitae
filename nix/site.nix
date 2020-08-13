{ lib, stdenv, nodejs, yarn, yarn2nix-moretea, gitignoreSource, rsync }:

let
  pname = "curriculum-vitae";
  nodeModules = yarn2nix-moretea.mkYarnModules {
    name = "${pname}-modules";
    pname = "${pname}-modules";
    version = "0.0.1";
    packageJSON = ../package.json;
    yarnLock = ../yarn.lock;
  };
in stdenv.mkDerivation {
  inherit pname nodeModules;
  version = "0.0.1";

  src = lib.cleanSourceWith {
    src = gitignoreSource ../.;
    name = pname;
    filter = path: _:
      let relPath = lib.removePrefix (toString ../.) path;
      in relPath != "/nix";
  };

  nativeBuildInputs = [ nodejs yarn rsync ];

  NODE_ENV = "production";

  configurePhase = ''
    export PATH="$(pwd)/node_modules/.bin:$PATH"
  '';

  buildPhase = ''
    ln -sf $nodeModules/node_modules .
    make -j $NIX_BUILD_CORES
  '';

  installPhase = ''
    cp -ar dist $out
  '';

  passthru.nodeModules = nodeModules;
}
