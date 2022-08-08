
#curl -H "Authorization: bearer GH_TOKEN_HASH" \
#  -X POST \
#  -d '{ "query": "query { viewer: { login }}" }' \
#  https://api.github.com/graphql

curl -H "Authorization: bearer GH_TOKEN_HASH" -X POST -d ' 
     { 
       "query": "query { viewer: { login }}" 
     } 
    ' https://api.github.com/graphql

