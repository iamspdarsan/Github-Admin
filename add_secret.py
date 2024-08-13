import http.client
import json
import os
from base64 import b64encode
from sys import argv

from nacl import encoding, public


def encrypt(public_key: str, secret_value: str) -> str:
  """Encrypt a Unicode string using the public key."""

  public_key = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder())
  sealed_box = public.SealedBox(public_key)
  encrypted = sealed_box.encrypt(secret_value.encode("utf-8"))
  return b64encode(encrypted).decode("utf-8")



def add_repo_secret(owner:str, repo:str):
    key_id,publicKey = get_public_key(owner,repo).values()
  
    secretName = "META_UPDATE_KEY"
    secret = encrypt(publicKey,os.getenv('META_UPDATE_KEY'))

    conn = http.client.HTTPSConnection("api.github.com")
        
    headers = {
        "Authorization": f"Bearer {os.getenv('META_UPDATE_KEY')}",
        "Content-Type": "application/json",
        "User-Agent": "Python-http.client",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    
    payload = json.dumps({
        "encrypted_value": secret,
        "key_id": key_id
    })
    
    url = f"/repos/{owner}/{repo}/actions/secrets/{secretName}"
    conn.request("PUT", url, body=payload, headers=headers)
    
    response = conn.getresponse()
    data = response.read()
    conn.close()
    
    # Handle the response (you can adjust this part as needed)
    if response.status == 201 or 204:
        print("Secret added successfully.")
    else:
        print(f"Failed to add secret: {response.status}")
        print(data.decode("utf-8"))


def get_public_key(owner:str, repo:str):
    conn = http.client.HTTPSConnection("api.github.com")

    headers = {
        "Authorization": f"Bearer {os.getenv('META_UPDATE_KEY')}",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Python-http.client"  
    }

    url = f"/repos/{owner}/{repo}/actions/secrets/public-key"
    conn.request("GET", url, headers=headers)

    response = conn.getresponse()
    data = response.read()
    conn.close()

    if response.status == 200:
        public_key_data = json.loads(data.decode("utf-8"))
        print("Public key retrieved successfully.")
        return public_key_data
    else:
        print(f"Failed to retrieve public key: {response.status}")
        print(data.decode("utf-8"))
        return None

def main():
    try:
        groupedRepoList:dict = json.loads(argv[1])
    except:
        print('parameter missing')
        return
         
    for username,repoList in groupedRepoList.items():
        for repoName in repoList:
            add_repo_secret(username,repoName)

main()