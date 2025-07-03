from openai import OpenAI
import json

client = OpenAI()

system_prompt = (
    "You are a DnD roleplay assistant who creates immersive personality summaries for player characters. "
    "You will provide at least 3 personalities, core traits, mannerisms, speech patterns, values, and any extra roleplaying notes "
    "with reasonings relevant to the user input given. "
    "Please format your response strictly only as a valid JSON like the following: "
    '{ '
    '"personality": [["string", "5-10 words reasoning"]], '
    '"core_traits": [["string", "5-10 words reasoning"]], '
    '"mannerisms": [["string", "5-10 words reasoning"]], '
    '"speech": [["string", "5-10 words reasoning"]], '
    '"values": [["string", "5-10 words reasoning"]], '
    '"roleplaying_notes": [["string", "5-10 words reasoning"]] '
    '}. '
    'Make sure all keys and string values are double-quoted and the output is parseable by `json.loads()`. '
    "If the input is unclear, irrelevant, or nonsensical, respond with only: {}\n\n"
    "Do not explain or apologize. Do not output anything other than the JSON.\n"
)

def getCharacterJSON(user_prompt: str):
  # print(f"Sending: {user_prompt}")
  response = client.responses.create(
    model="gpt-4.1",
    instructions = system_prompt,
    input = user_prompt,
  )
  # print("Sent")
  # print(response.output_text)
  return response.output_text

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

