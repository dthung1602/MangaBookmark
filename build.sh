# exit on any failure
set -e

# cd to code root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}"

# generate Swagger doc
yarn --cwd "${DIR}/backend" run gendoc

# build FE
yarn --cwd "${DIR}/frontend" run build
