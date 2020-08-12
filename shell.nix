{ pkgs ? import ./. }:

pkgs.mkShell { buildInputs = with pkgs; [ bashInteractive nodejs yarn ]; }
