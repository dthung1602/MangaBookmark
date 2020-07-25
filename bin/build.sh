# exit on any failure
set -e

# cd to code root directory
BIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${BIN_DIR}/.."

# generate Swagger doc
yarn run gendoc

# build FE
cd react-mb-client
yarn install
yarn build
rm -rf node_modules