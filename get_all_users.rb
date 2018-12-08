require "oauth2"
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
UID = "b42e6c797084f21a3e815214db50cc62d85f320f22f8ef2b92b32fe900ceeec8"
SECRET = "1a0dcb322d1028b0b811cb49c5d370c350baf6778818754534149eec4f8d4449"
token = OAuth2::Client.new(UID, SECRET, site: "http://api.intra.42.fr").client_credentials.get_token
i = 0
response = token.get("/v2/users?page=#{i}")
while response
    pp response.parsed
    i+=1
    response = token.get("/v2/campus/7/users?page=#{i}")
end


    