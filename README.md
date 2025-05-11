
<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.png" alt="Markdownify" width="200"></a>
  <br>
  The Dungeon Scribe
  <br>
</h1>

<h4 align="center">An AI-companion to help you create a Dungeons & Dragons character with depth and give character notes to enhance your roleplaying abilities!
<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.gif)

## Key Features

* Lore Builder CLI - Add depth to your character with the help of AI!
  - Assistance in choosing simple characteristics like race/class/alignment.
  - Assistance in creating captivating backstories to add character depth.
* Character Roleplay Notes Summarizer - Highlights key details for your character to help with roleplaying!
  - Provide details about your character and our AI will give specific traits that could help you roleplay your character.
    - Personalities
    - Core Traits
    - Mannerisms
    - Speech Patterns
    - Values/Goals
    - Other Roleplaying Notes

## How To Use
To clone and run this application, you'll need [Python](https://www.python.org/downloads/), [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:
```bash
# Clone this repository
$ git clone https://github.com/AndyNguwin/dungeon-scribe.git

# Install dependencies
$ npm install
```
### Lore Builder CLI
```bash
# Go into the repository
$ cd dungeon-scribe

# Create a Python virtual environment
$ python -m venv {environment_name}

# Activate the environment
$ ./{envionment_name}/Scripts/activate

# Install boto3
$ pip install boto3

# Run the LoreNotes.py
```
### Character Roleplay Notes Summarizer
```bash
# Go into the repository
$ cd dungeon-scribe

# Install dependencies
$ npm install

# Run the app
$ npm start
```
You can also run the RoleplayNotes.py if you want to use a CLI.

## Technologies Used
- AWS Bedrock
  - Mistral Large 2 was used to create our AI Assistant.
- AWS API Gateway
  - Configured endpoints for our frontend to process user input and provide relevant output (roleplaying notes)
- AWS Lambda
  - Connected with API Gateway to implement the backend logic to prompt Mistral Large 2 and return the AI Assistant's responses to the user.
- React
  - Created a simple UI for our Character Roleplay Notes Summarizer
 
## Team Members and Contributions
- Andy Nguyen:
  - Implement interaction with Mistral Large 2 using AWS Bedrock
  - Refined prompts to send to Mistral Large 2
  - Created Lambda functions to handle user input and retrieve output with Mistral Large 2
  - Configured API endpoints to send requests to with API Gateway
- Dragon Keonorasak:
  - Created frontend UI using React
  - Send requests from React to API endpoints using Axios
  - Processing responses from Mistral Large 2
  - Implemented chatbot feature with message history for Lore Builder to maintain conversation and context.

