import boto3
import json

BEDROCK_RUNTIME = boto3.client('bedrock-runtime', region_name='us-west-2')
PERSONALITY_PROMPT = (
    "You are a DnD roleplay assistant who helps users create immersive backstories for their characters."
    "Do not create a backstory for the user unless asked to."
    "Please provide guidance and direction on based on the user input of what kind of character they want."
    "Please help the user think of what kind of character they can make if they don't know where to start."   
    "Please provide suggestions in a clear and concise manner that is easy to read."
    "Always end the message by asking if things need to be clarified or to tell users to tell you what new information they decide on."
    "Also provide the option to summarize and rephrase the character based on the conversation and what they user wanted from past messages."
    "If the input is unclear, irrelevant, or nonsensical, or if they ask for something you don't know, prompt them again. \n\n"
    "Do not explain or apologize. Ask for them to ask again.\n" )

CHAT_HISTORY = [
    {"role": "system", "content": PERSONALITY_PROMPT},
]

# def getCharacterJSON(user_prompt: str) -> str:
def chatWithBot(messages):
    # Takes in the chat history, which is a list of dictionaries holding message information
    # Returns response of the chatbot
    kwargs = {
        "modelId": "mistral.mistral-large-2402-v1:0",
        "contentType": "application/json",
        "accept": "application/json",
        "body": json.dumps({
        "messages": messages,
        "max_tokens": 1000,
        "temperature": 0.8,
        "top_p": 0.9
        })
    }
  
    response = BEDROCK_RUNTIME.invoke_model(**kwargs)
    try:
        # print(response)
        body = json.loads(response['body'].read())
        content = (body['choices'][0]['message']['content'])
        return content
    except json.JSONDecodeError as e:
        # print("Invalid JSON: ", e)
        return json.dumps({})

def lambdaHandler(event, context):
    print("TEST LOG: Lambda was invoked")
    # Will handler user input of their character to prompt the LLM/AI Chatbot
    try:
        # print(f'EVENT: {event}')
        body = json.loads(event["body"])
        # print(f'BODY: {body}')
        messages = body["messages"]
        # print(user_prompt)
        return { 
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps({
                "message": chatWithBot(messages)
            })
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


if __name__ == "__main__":
    response = ""
    while True:
        prompt = input("Tell me what you want: ")
        CHAT_HISTORY.append({"role": "user", "content": prompt})
        # prompt = input()
        response = chatWithBot(CHAT_HISTORY)
        CHAT_HISTORY.append({"role": "assistant", "content": response})
        if response == "":
            print("I had an error understanding your input. Please try again.") 
        print("\n", response)
        # print(CHAT_HISTORY)

