import boto3
import json

bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-west-2')

system_prompt = (
    "You are a DnD roleplay assistant who creates immersive personality summaries for player characters."
    "You will provide at least 3 personalities, core traits, mannerisms, speech patterns, values, and any extra roleplaying notes"
    "with reasonings relevant to the user input given."
    "Please format your response strictly only as a valid JSON like the following: "
    '{ '
    '"personality": [["string", "5-10 words reasoning"]], '
    '"core_traits": [["string", "5-10 words reasoning"]], '
    '"mannerisms": [["string", "5-10 words reasoning"]], '
    '"speech": [["string", "5-10 words reasoning"]], '
    '"values": [["string", "5-10 words reasoning"]], '
    '"roleplaying_notes": [["string", "5-10 words reasoning"]] '
    '}.'
    'Make sure all keys and string values are double-quoted and the output is parseable by `json.loads()`."'
    "If the input is unclear, irrelevant, or nonsensical, respond with only: {}\n\n"
    "Do not explain or apologize. Do not output anything other than the JSON.\n"
)

def lambdaHandler(event, context):
  # Will handler user input of their character to prompt the LLM/AI Chatbot
  try:
    # print(f'EVENT: {event}')
    body = json.loads(event["body"])
    # print(f'BODY: {body}')
    user_prompt = body["user_prompt"]
    # print(user_prompt)
    return { "statusCode": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": getCharacterJSON(user_prompt)
    }
  except Exception as e:
    print("ERROR: ", str(e))
    raise e
    # return { "statusCode": 500,
    #         "headers": {
    #           "Content-Type": "application/json"
    #         },
    #         "body": json.dumps({"error": str(e)})
    # }


# def getCharacterJSON(user_prompt: str) -> dict[str, list[str, str]]:
def getCharacterJSON(user_prompt: str):
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
          "content": system_prompt + "\n" + user_prompt
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
    # print(body['choices'][0]['message']['content'])
    content = json.loads(body['choices'][0]['message']['content'])
    # print(content.keys())
    return json.dumps(content)
  except json.JSONDecodeError as e:
    # print("Invalid JSON: ", e)
    return json.dumps({})


def _displayNotes(notes) -> None:
  print("\nHere are notes to enhance your roleplaying abilities with confidence!")
  for k in notes.keys():
    print("\n", k.upper())
    for note, reason in notes[k]:
      print("\t", note, "|", reason)


if __name__ == "__main__":
  response = "{}"
  while response == "{}":
    prompt = input("Character prompt: ")
    response = getCharacterJSON(prompt)
    if response == "{}":
      print("I had an error understanding your input. Please try again.") 
  _displayNotes(json.loads(response))

