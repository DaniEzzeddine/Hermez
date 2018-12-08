require "oauth2"
require "json"

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
UID = "b42e6c797084f21a3e815214db50cc62d85f320f22f8ef2b92b32fe900ceeec8"
SECRET = "1a0dcb322d1028b0b811cb49c5d370c350baf6778818754534149eec4f8d4449"
token = OAuth2::Client.new(UID, SECRET, site: "http://api.intra.42.fr").client_credentials.get_token
response  = token.get("/v2/users/#{ARGV[0]}").parsed
obj = {'firstname' => response["first_name"], 'lastname' => response["last_name"], 'intraname' => response["login"]}
pp obj.to_json
# pp obj