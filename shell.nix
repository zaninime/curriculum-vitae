{ pkgs ? import ./nix/pkgs.nix }:

pkgs.mkShell { buildInputs = with pkgs; [ bashInteractive nodejs yarn ]; }
