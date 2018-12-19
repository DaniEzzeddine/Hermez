require "oauth2"
require "json"

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
UID = ""
SECRET = ""
token = OAuth2::Client.new(UID, SECRET, site: "http://api.intra.42.fr").client_credentials.get_token
response  = token.get("/v2/users/#{ARGV[0]}").parsed
obj = {'firstname' => response["first_name"], 'lastname' => response["last_name"], 'intraname' => response["login"]}
pp obj.to_json
# pp obj
