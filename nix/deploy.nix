{ writers, netlify, site }:
writers.writeBash "${site.pname}-deploy" ''
  set -eu

  # check existence
  export NETLIFY_AUTH_TOKEN="$NETLIFY_AUTH_TOKEN"
  export NETLIFY_SITE_ID="$NETLIFY_SITE_ID"

  exec ${netlify}/bin/netlify deploy -d ${site} -m "Hash: $(basename ${site} | awk -F- '{ print $1; }')" "$@"
''
