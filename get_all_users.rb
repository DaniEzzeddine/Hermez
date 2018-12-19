require "oauth2"
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
UID = ""
SECRET = ""
token = OAuth2::Client.new(UID, SECRET, site: "http://api.intra.42.fr").client_credentials.get_token
i = 0
response = token.get("/v2/users?page=#{i}")
while response
    pp response.parsed
    i+=1
    response = token.get("/v2/campus/7/users?page=#{i}")
end


    
