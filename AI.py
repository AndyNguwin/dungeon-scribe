import boto3
import json

bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-west-2')

system_prompt = (
    "You are a DnD roleplay assistant who creates immersive personality summaries for player characters. "
    "Please format your response as valid JSON like the following: "
    '{ '+
    '"personality": [["string", "short reasoning"]], '
    '"core_traits": [["string", "short reasoning"]], '
    '"mannerisms": [["string", "short reasoning"]], '
    '"speech": [["string", "short reasoning"]], '
    '"values": [["string", "short reasoning"]], '
    '"roleplaying_notes": [["string", "short reasoning"]] '
    '}. Make sure all keys and string values are double-quoted and the output is parseable by `json.loads()`."'
)

def getCharacterJSON(prompt: str) -> str:
  kwargs = {
    "modelId": "mistral.mistral-large-2402-v1:0",
    "contentType": "application/json",
    "accept": "application/json",
    "body": json.dumps({
      "messages": [
        {
          "role": "system",
          "content": system_prompt
        },
        {
          "role": "user",
          "content": prompt
        }
      ],
      "max_tokens": 1000,
      "temperature": 0.8,
      "top_p": 0.9
    })
  }
  

  response = bedrock_runtime.invoke_model(**kwargs)
  try:
    body = json.loads(response['body'].read())
    # print(body)
    content = json.loads(body['choices'][0]['message']['content'])
    # print(content.keys())
    return json.dumps(content)
  except json.JSONDecodeError as e:
    print("Invalid JSON: ", e)

if __name__ == "__main__":
  prompt = input("Character prompt: ")
  print(json.loads(getCharacterJSON(prompt)))

