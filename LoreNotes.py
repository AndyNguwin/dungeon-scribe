import boto3
import json

BEDROCK_RUNTIME = boto3.client('bedrock-runtime', region_name='us-west-2')
PERSONALITY_PROMPT = (
    "You are a DnD roleplay assistant who creates immersive personality summaries for player characters."
    "Please give me a backstory to add some depth to my character based on the personality summary you provided"   
    "If the input is unclear, irrelevant, or nonsensical, or if they ask for something you don't know, prompt them again. \n\n"
    "Do not explain or apologize. Ask for them to ask again.\n" )
CHAT_HISTORY = [
    {"role": "system", "content": PERSONALITY_PROMPT},
]

# def getCharacterJSON(user_prompt: str) -> str:
def getLoreJSON(user_prompt: str):
    CHAT_HISTORY.append(
        {"role": "user", "content": user_prompt}
    )
  
    kwargs = {
        "modelId": "mistral.mistral-large-2402-v1:0",
        "contentType": "application/json",
        "accept": "application/json",
        "body": json.dumps({
        "messages": CHAT_HISTORY,
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

if __name__ == "__main__":
    response = ""
    while True:
        prompt = input("Character prompt: ")
        # prompt = input()
        response = getLoreJSON(prompt)
        CHAT_HISTORY.append(
        {
            "role": "assistant", "content": response
        })
        if response == "":
            print("I had an error understanding your input. Please try again.") 
        print((response))
        # print(CHAT_HISTORY)

